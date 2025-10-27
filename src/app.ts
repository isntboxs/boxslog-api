/*
 * Custom modules
 */
import createApp from '@/lib/create-app';

/**
 * Routes
 */
import index from '@/routes/index';
import auth from '@/routes/auth';
import blogs from '@/routes/blogs';

const app = createApp();

const routes = [index, auth, blogs] as const;

routes.forEach(route => {
  app.basePath('/api').route('/', route);
});

export type AppType = (typeof routes)[number];

export default app;
