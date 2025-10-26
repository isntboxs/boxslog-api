/**
 * Node modules
 */
import 'dotenv/config';
import process from 'node:process';
import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    DATABASE_URL: z.url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
    CORS_ORIGINS: z.string().transform(value =>
      value
        .split(',')
        .map(origin => origin.trim())
        .filter(Boolean)
    ),
    BETTER_AUTH_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
