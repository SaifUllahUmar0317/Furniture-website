import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './_lib/db.js';

export default async function handler(req: IncomingMessage & { query?: any; body?: any }, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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
    res.end(JSON.stringify({ source: 'local_fallback', data: [] }));
    return;
  }

  try {
    await ensureSchema();

    let body = req.body;
    if (!body && (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH')) {
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
      const rows = await sql`SELECT * FROM projects ORDER BY id ASC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ source: 'neon', data: rows }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const p = body;
      if (!p || !p.title) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Title is required' }));
        return;
      }

      if (p.id) {
        await sql`
          UPDATE projects
          SET title = ${p.title},
              type = ${p.type || ''},
              description = ${p.desc || p.description || ''},
              img = ${p.img || ''}
          WHERE id = ${p.id};
        `;
      } else {
        await sql`
          INSERT INTO projects (title, type, description, img)
          VALUES (${p.title}, ${p.type || ''}, ${p.desc || p.description || ''}, ${p.img || ''});
        `;
      }

      const rows = await sql`SELECT * FROM projects ORDER BY id ASC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: rows }));
      return;
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id') || body?.id;

      if (!id) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Project id is required' }));
        return;
      }

      await sql`DELETE FROM projects WHERE id = ${Number(id)};`;
      const rows = await sql`SELECT * FROM projects ORDER BY id ASC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: rows }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  } catch (error: any) {
    console.error('API /api/projects error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
  }
}
