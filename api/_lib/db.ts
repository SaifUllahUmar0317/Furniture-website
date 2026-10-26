import https from 'node:https';
import { neon, neonConfig } from '@neondatabase/serverless';

// Public routable IPs for Neon AWS US-East-1 endpoint to bypass CGNAT 100.62.x.x unroutable DNS entries
const PUBLIC_NEON_IPS = ['34.205.173.201', '52.2.183.93'];
let ipIndex = 0;

if (typeof process !== 'undefined') {
  neonConfig.fetchFunction = (url: string, opts: any = {}) => {
    return new Promise((resolve, reject) => {
      const parsed = new URL(url);
      const targetIp = PUBLIC_NEON_IPS[ipIndex % PUBLIC_NEON_IPS.length];
      ipIndex++;

      const headers = { ...opts.headers, Host: parsed.host };

      const req = https.request(
        {
          protocol: 'https:',
          hostname: targetIp,
          port: 443,
          path: parsed.pathname + parsed.search,
          method: opts.method || 'GET',
          headers: headers,
          servername: parsed.hostname,
          timeout: 10000,
        },
        (res) => {
          const chunks: Buffer[] = [];
          res.on('data', (c) => chunks.push(c));
          res.on('end', () => {
            const text = Buffer.concat(chunks).toString('utf8');
            resolve({
              ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300,
              status: res.statusCode || 200,
              statusText: res.statusMessage || 'OK',
              text: async () => text,
              json: async () => JSON.parse(text),
            });
          });
        }
      );

      req.on('timeout', () => {
        req.destroy(new Error('Connect timeout to Neon'));
      });
      req.on('error', reject);

      if (opts.body) {
        req.write(opts.body);
      }
      req.end();
    });
  };
}

const DEFAULT_DATABASE_URL = 'postgresql://neondb_owner:npg_U9aeszr3Rtic@ep-hidden-waterfall-b7ctz71u-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

/**
 * Returns a Neon SQL execution instance if DATABASE_URL is configured.
 */
export function getDb() {
  const dbUrl = process.env.DATABASE_URL || DEFAULT_DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  return neon(dbUrl);
}

let schemaEnsured = false;

/**
 * Automatically creates all tables and indexes if they do not exist.
 */
export async function ensureSchema() {
  if (schemaEnsured) return true;
  const sql = getDb();
  if (!sql) return false;

  try {
    // 1. Products Table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price INTEGER NOT NULL,
        price_qualifier TEXT DEFAULT 'fixed',
        image TEXT NOT NULL,
        description TEXT,
        stock TEXT DEFAULT 'in-stock',
        badge TEXT,
        specs JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 2. Projects Table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        img TEXT NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 3. Gallery Table
    await sql`
      CREATE TABLE IF NOT EXISTS gallery (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        src TEXT NOT NULL,
        class_name TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    // 4. Admin Auth Table
    await sql`
      CREATE TABLE IF NOT EXISTS admin_auth (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL DEFAULT 'admin',
        password_hash TEXT NOT NULL,
        recovery_key TEXT NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;

    schemaEnsured = true;
    return true;
  } catch (error) {
    console.error('Error ensuring database schema:', error);
    return false;
  }
}
