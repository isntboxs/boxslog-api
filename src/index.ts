/*
 * Node modules
 */
import { serve } from '@hono/node-server';

/*
 * Custom modules
 */
import app from '@/app';

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  info => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
