import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './lib/db';

const DEFAULT_HASH = 'b938f60f9f16d793c81e4743e41dad45d2c4f6e4e67318584632ac8968283297'; // 'hafsa2026'
const DEFAULT_RECOVERY_KEY = 'TehkalHafsa2026Reset';

export default async function handler(req: IncomingMessage & { body?: any }, res: ServerResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
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
    res.end(JSON.stringify({ source: 'local_fallback', message: 'Database not connected, using client verification' }));
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

    // Ensure default admin record exists
    const existing = await sql`SELECT * FROM admin_auth LIMIT 1;`;
    if (existing.length === 0) {
      await sql`
        INSERT INTO admin_auth (username, password_hash, recovery_key)
        VALUES ('admin', ${DEFAULT_HASH}, ${DEFAULT_RECOVERY_KEY});
      `;
    }

    const { action } = body || {};

    if (action === 'get_info') {
      const auth = (await sql`SELECT username, recovery_key FROM admin_auth LIMIT 1;`)[0];
      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({
        username: auth?.username || 'admin',
        recoveryKey: auth?.recovery_key || DEFAULT_RECOVERY_KEY,
      }));
      return;
    }

    if (action === 'verify') {
      const { username, passwordHash } = body;
      const auth = (await sql`SELECT * FROM admin_auth LIMIT 1;`)[0];

      const matchUser = (username || '').trim().toLowerCase() === (auth?.username || 'admin').trim().toLowerCase();
      const matchPass = passwordHash === (auth?.password_hash || DEFAULT_HASH);

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: matchUser && matchPass }));
      return;
    }

    if (action === 'change_password') {
      const { currentPasswordHash, newPasswordHash, newUsername } = body;
      const auth = (await sql`SELECT * FROM admin_auth LIMIT 1;`)[0];

      if (currentPasswordHash !== (auth?.password_hash || DEFAULT_HASH)) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Current password is incorrect' }));
        return;
      }

      await sql`
        UPDATE admin_auth
        SET password_hash = ${newPasswordHash},
            username = ${newUsername ? newUsername.trim() : auth.username},
            updated_at = NOW()
        WHERE id = ${auth.id};
      `;

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
      return;
    }

    if (action === 'reset_password') {
      const { recoveryKey, newPasswordHash } = body;
      const auth = (await sql`SELECT * FROM admin_auth LIMIT 1;`)[0];

      if ((recoveryKey || '').trim() !== (auth?.recovery_key || DEFAULT_RECOVERY_KEY).trim()) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Invalid secret recovery key' }));
        return;
      }

      await sql`
        UPDATE admin_auth
        SET password_hash = ${newPasswordHash},
            updated_at = NOW()
        WHERE id = ${auth.id};
      `;

      res.setHeader('Content-Type', 'application/json');
      res.statusCode = 200;
      res.end(JSON.stringify({ success: true }));
      return;
    }

    res.statusCode = 400;
    res.end(JSON.stringify({ error: 'Unknown action' }));
  } catch (error: any) {
    console.error('API /api/auth error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: error.message || 'Internal Server Error' }));
  }
}
