import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './lib/db';
import { products as defaultProducts } from '../src/data/products';

export default async function handler(req: IncomingMessage & { query?: any; body?: any }, res: ServerResponse & { status?: any; json?: any }) {
  // Set CORS headers
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
    // If database is not configured yet, return fallback default products
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({ source: 'local_fallback', data: defaultProducts }));
    return;
  }

  try {
    await ensureSchema();

    // Parse body if not already parsed
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {}
    }

    if (req.method === 'GET') {
      const rows = await sql`SELECT * FROM products ORDER BY id DESC;`;

      if (rows.length === 0) {
        // Auto-seed with default catalog
        for (const p of defaultProducts) {
          await sql`
            INSERT INTO products (slug, name, category, price, price_qualifier, image, description, stock, badge, specs)
            VALUES (
              ${p.slug}, ${p.name}, ${p.category}, ${p.price}, ${p.priceQualifier || 'fixed'},
              ${p.image}, ${p.description || ''}, ${p.stock || 'in-stock'}, ${p.badge || null},
              ${JSON.stringify(p.specs || [])}::jsonb
            )
            ON CONFLICT (slug) DO NOTHING;
          `;
        }
        const seeded = await sql`SELECT * FROM products ORDER BY id DESC;`;
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 200;
        res.end(JSON.stringify({ source: 'neon', data: seeded }));
        return;
      }

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ source: 'neon', data: rows }));
      return;
    }

    if (req.method === 'POST' || req.method === 'PUT') {
      const p = body;
      if (!p || !p.name) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Product name is required' }));
        return;
      }

      const slug = p.slug || (p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now());

      if (p.id) {
        // Update existing
        await sql`
          UPDATE products
          SET name = ${p.name},
              category = ${p.category || 'General'},
              price = ${Number(p.price) || 0},
              price_qualifier = ${p.priceQualifier || 'fixed'},
              image = ${p.image || ''},
              description = ${p.description || ''},
              stock = ${p.stock || 'in-stock'},
              badge = ${p.badge || null},
              specs = ${JSON.stringify(p.specs || [])}::jsonb,
              updated_at = NOW()
          WHERE id = ${p.id};
        `;
      } else {
        // Insert new
        await sql`
          INSERT INTO products (slug, name, category, price, price_qualifier, image, description, stock, badge, specs)
          VALUES (
            ${slug}, ${p.name}, ${p.category || 'General'}, ${Number(p.price) || 0}, ${p.priceQualifier || 'fixed'},
            ${p.image || ''}, ${p.description || ''}, ${p.stock || 'in-stock'}, ${p.badge || null},
            ${JSON.stringify(p.specs || [])}::jsonb
          );
        `;
      }

      const updated = await sql`SELECT * FROM products ORDER BY id DESC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: updated }));
      return;
    }

    if (req.method === 'DELETE') {
      const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
      const id = url.searchParams.get('id') || body?.id;

      if (!id) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: 'Product id is required' }));
        return;
      }

      await sql`DELETE FROM products WHERE id = ${Number(id)};`;
      const remaining = await sql`SELECT * FROM products ORDER BY id DESC;`;
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true, data: remaining }));
      return;
    }

    res.statusCode = 405;
    res.end(JSON.stringify({ error: 'Method Not Allowed' }));
  } catch (error: any) {
    console.error('API /api/products error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
  }
}
