import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './_lib/db.js';

export default async function handler(req: IncomingMessage & { query?: any; body?: any }, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  const sql = getDb();
  if (!sql) {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ source: 'local_fallback', items: [] }));
    return;
  }

  try {
    await ensureSchema();

    // Parse body if method is POST/PUT
    let body = req.body;
    if (!body && (req.method === 'POST' || req.method === 'PUT')) {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
      }
      const raw = Buffer.concat(chunks).toString('utf-8');
      try {
        body = JSON.parse(raw);
      } catch {
        body = raw;
      }
    } else if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {}
    }

    if (req.method === 'GET') {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const email = (url.searchParams.get('email') || '').trim().toLowerCase();

      if (!email) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ success: true, items: [] }));
        return;
      }

      const rows = await sql`
        SELECT items FROM user_carts
        WHERE LOWER(user_email) = ${email}
        LIMIT 1;
      `;

      const items = rows[0]?.items || [];
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, email, items }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const email = (body?.email || '').trim().toLowerCase();
      const items = Array.isArray(body?.items) ? body.items : [];

      if (!email) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Valid account email is required' }));
        return;
      }

      await sql`
        INSERT INTO user_carts (user_email, items, updated_at)
        VALUES (${email}, ${JSON.stringify(items)}::jsonb, NOW())
        ON CONFLICT (user_email)
        DO UPDATE SET items = ${JSON.stringify(items)}::jsonb, updated_at = NOW();
      `;

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, count: items.length }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  } catch (err: any) {
    console.error('API /api/cart error:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
  }
}
