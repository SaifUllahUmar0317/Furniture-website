import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './lib/db';

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
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {}
    }

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM gallery ORDER BY id DESC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ source: 'neon', data: rows }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const g = body;
      if (!g || !g.title || !g.src) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Title and image source are required' }));
        return;
      }

      if (g.id) {
        await sql`
          UPDATE gallery
          SET title = ${g.title},
              src = ${g.src},
              class_name = ${g.className || g.class_name || ''}
          WHERE id = ${g.id};
        `;
      } else {
        await sql`
          INSERT INTO gallery (title, src, class_name)
          VALUES (${g.title}, ${g.src}, ${g.className || g.class_name || ''});
        `;
      }

      const rows = await sql`SELECT * FROM gallery ORDER BY id DESC;`;
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
        res.end(JSON.stringify({ error: 'Gallery id is required' }));
        return;
      }

      await sql`DELETE FROM gallery WHERE id = ${Number(id)};`;
      const rows = await sql`SELECT * FROM gallery ORDER BY id DESC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: rows }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  } catch (error: any) {
    console.error('API /api/gallery error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
  }
}
