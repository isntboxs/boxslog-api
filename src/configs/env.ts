/**
 * Node modules
 */
import 'dotenv/config';
import process from 'node:process';
import { createEnv } from '@t3-oss/env-core';
import * as z from 'zod';

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PORT: z.coerce.number(),
    LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
