import type { IncomingMessage, ServerResponse } from 'http';
import { getDb } from './lib/db';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const sql = getDb();

  if (!sql) {
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'online',
      database: 'unconfigured',
      message: 'App is running in client/local mode. Set DATABASE_URL in Vercel to connect Neon.',
    }));
    return;
  }

  try {
    const result = await sql`SELECT NOW() as current_time;`;
    res.statusCode = 200;
    res.end(JSON.stringify({
      status: 'online',
      database: 'connected',
      neonTimestamp: result[0]?.current_time,
    }));
  } catch (err: any) {
    res.statusCode = 500;
    res.end(JSON.stringify({
      status: 'online',
      database: 'error',
      error: err.message,
    }));
  }
}
