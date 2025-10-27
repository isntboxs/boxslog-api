/**
 * Node modules
 */
import { HTTPException } from 'hono/http-exception';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom modules
 */
import { auth } from '@/lib/auth';
import factory from '@/lib/factory';

const requireAuth = factory.createMiddleware(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    throw new HTTPException(StatusCodes.UNAUTHORIZED, {
      cause: 'Unauthorized',
      message: 'You are not authenticated',
    });
  }

  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});

export default requireAuth;
