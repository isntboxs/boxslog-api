/**
 * Types
 */
import type { PrismaClient } from '@/generated/prisma/client';
import type { auth } from '@/lib/auth';
import type { PinoLogger } from 'hono-pino';

export interface AppBindings {
  Variables: {
    logger: PinoLogger;
    db: PrismaClient;
    session: typeof auth.$Infer.Session.session | null;
    user: typeof auth.$Infer.Session.user | null;
  };
}
