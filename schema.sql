-- ========================================================
-- Tehkal Hafsa Furniture — Neon PostgreSQL Database Schema
-- ========================================================
-- You can run this file directly in the Neon SQL Editor
-- (https://console.neon.tech), though the Vercel backend
-- will also automatically create these tables on first launch!

-- 1. Products Table
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

-- Index for fast category and slug queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);

-- 2. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    description TEXT NOT NULL,
    img TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    src TEXT NOT NULL,
    class_name TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Admin Authentication & Recovery Table
CREATE TABLE IF NOT EXISTS admin_auth (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL DEFAULT 'admin',
    password_hash TEXT NOT NULL,
    recovery_key TEXT NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert Default Admin Credentials if not already present
-- Default Username: admin
-- Default Password: hafsa2026 (SHA-256 hash below)
-- Default Recovery Key: TehkalHafsa2026Reset
INSERT INTO admin_auth (id, username, password_hash, recovery_key)
VALUES (
    1,
    'admin',
    'b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297',
    'TehkalHafsa2026Reset'
)
ON CONFLICT (id) DO NOTHING;
