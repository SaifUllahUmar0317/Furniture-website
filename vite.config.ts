import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, loadEnv, type Plugin } from 'vite';

function apiDevPlugin(): Plugin {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/')) {
          return next();
        }

        const urlPath = req.url.split('?')[0];
        const route = urlPath.replace('/api/', '');

        if (!route || route.startsWith('_')) {
          return next();
        }

        try {
          if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
            const chunks: Buffer[] = [];
            for await (const chunk of req) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
            }
            const rawBody = Buffer.concat(chunks).toString('utf-8');
            try {
              (req as any).body = JSON.parse(rawBody);
            } catch {
              (req as any).body = rawBody;
            }
          }

          const mod = await server.ssrLoadModule(`/api/${route}.ts`);
          if (mod && typeof mod.default === 'function') {
            await mod.default(req, res);
            return;
          }
        } catch (err: any) {
          console.error(`[API Dev Error] ${req.url}:`, err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  process.env.DATABASE_URL =
    env.DATABASE_URL ||
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_U9aeszr3Rtic@ep-hidden-waterfall-b7ctz71u-pooler.c-13.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

  return {
    base: process.env.BASE_PATH || '/',
    plugins: [
      react(),
      tailwindcss(),
      apiDevPlugin(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './src/assets'),
      },
      dedupe: ['react', 'react-dom'],
    },
    server: {
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    },
    preview: {
      port: Number(process.env.PORT) || 3000,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-ui': ['framer-motion', 'lucide-react', 'react-icons', 'clsx', 'tailwind-merge'],
          },
        },
      },
    },
  };
});
