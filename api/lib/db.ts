import { neon } from '@neondatabase/serverless';

/**
 * Returns a Neon SQL execution instance if DATABASE_URL is configured.
 */
export function getDb() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    return null;
  }
  return neon(dbUrl);
}

/**
 * Automatically creates all tables and indexes if they do not exist.
 */
export async function ensureSchema() {
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

    return true;
  } catch (error) {
    console.error('Error ensuring database schema:', error);
    return false;
  }
}
