/**
 * Node modules
 */
import { requestId } from 'hono/request-id';

/**
 * Custom modules
 */
import factory from '@/lib/factory';
import appLogger from '@/lib/logger';

export default function createApp() {
  const app = factory.createApp();

  app.use(requestId());
  app.use(appLogger());

  return app;
}
