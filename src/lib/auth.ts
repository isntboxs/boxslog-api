/**
 * Node modules
 */
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { openAPI, username } from 'better-auth/plugins';

/**
 * Custom modules
 */
import { env } from '@/configs/env';
import { db } from '@/lib/db';

/**
 * Types
 */
import type { BetterAuthOptions } from 'better-auth';

export const auth = betterAuth<BetterAuthOptions>({
  appName: 'boxslog-api',
  emailAndPassword: {
    enabled: true,
  },
  logger: {
    level: env.LOG_LEVEL,
    disabled: env.NODE_ENV === 'production',
  },
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  plugins: [openAPI(), username()],
  trustedOrigins: env.CORS_ORIGINS,
  baseURL: env.BETTER_AUTH_URL,
  secret: env.BETTER_AUTH_SECRET,
});
