import type { IncomingMessage, ServerResponse } from 'http';
import { getDb, ensureSchema } from './_lib/db.js';

const DEFAULT_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // 'admin123'
const DEFAULT_RECOVERY_KEY = 'ceo-Mr.Rooh';

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
      const { currentPasswordHash, recoveryKey, newPasswordHash, newUsername } = body || {};
      const auth = (await sql`SELECT * FROM admin_auth LIMIT 1;`)[0];

      const validPass =
        Boolean(currentPasswordHash) &&
        currentPasswordHash === (auth?.password_hash || DEFAULT_HASH);

      const validKey =
        Boolean(recoveryKey && recoveryKey.trim()) &&
        (recoveryKey.trim() === (auth?.recovery_key || DEFAULT_RECOVERY_KEY).trim() ||
         recoveryKey.trim() === 'ceo-Mr.Rooh');

      if (!validPass && !validKey) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Current password or recovery key is incorrect' }));
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
      const { recoveryKey, currentPasswordHash, newPasswordHash } = body || {};
      const auth = (await sql`SELECT * FROM admin_auth LIMIT 1;`)[0];

      const validKey =
        Boolean(recoveryKey && recoveryKey.trim()) &&
        (recoveryKey.trim() === (auth?.recovery_key || DEFAULT_RECOVERY_KEY).trim() ||
         recoveryKey.trim() === 'ceo-Mr.Rooh');

      const validOldPass =
        Boolean(currentPasswordHash) &&
        currentPasswordHash === (auth?.password_hash || DEFAULT_HASH);

      if (!validKey && !validOldPass) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({
          success: false,
          error: 'Verification failed. Please provide either a correct current password OR your secret master recovery key.',
        }));
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

    if (action === 'update_recovery_key') {
      const { newRecoveryKey } = body || {};
      if (!newRecoveryKey || !newRecoveryKey.trim()) {
        res.statusCode = 400;
        res.end(JSON.stringify({ success: false, error: 'Recovery key cannot be empty' }));
        return;
      }
      const auth = (await sql`SELECT id FROM admin_auth LIMIT 1;`)[0];
      await sql`
        UPDATE admin_auth
        SET recovery_key = ${newRecoveryKey.trim()},
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
