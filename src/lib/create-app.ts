/**
 * Node modules
 */
import { requestId } from 'hono/request-id';
import { prettyJSON } from 'hono/pretty-json';
import { cors } from 'hono/cors';

/**
 * Custom modules
 */
import factory from '@/lib/factory';
import appLogger from '@/lib/logger';
import notFound from '@/middlewares/not-found';
import onError from '@/middlewares/on-error';
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon';
import { env } from '@/configs/env';

export default function createApp() {
  const app = factory.createApp();

  app.use(requestId());
  app.use(appLogger());
  app.use(prettyJSON());
  app.use(
    cors({
      origin: env.CORS_ORIGINS,
      allowHeaders: ['Content-Type', 'Authorization'],
      allowMethods: ['POST', 'GET', 'OPTIONS'],
      exposeHeaders: ['Content-Length'],
      maxAge: 600,
      credentials: true,
    })
  );
  app.use(serveEmojiFavicon('🤖'));

  app.notFound(notFound);
  app.onError(onError);

  return app;
}
