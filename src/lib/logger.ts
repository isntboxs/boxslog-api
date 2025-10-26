/**
 * Node modules
 */
import pino from 'pino';
import pretty from 'pino-pretty';
import { pinoLogger } from 'hono-pino';
import { format } from 'date-fns';

/**
 * Custom modules
 */
import { env } from '@/configs/env';

export const logger = pino(
  {
    level: env.LOG_LEVEL,
    timestamp: () => `,"time":"${format(new Date(), 'HH:mm:ss')}"`,
  },
  pretty()
);

export default function appLogger() {
  return pinoLogger({ pino: logger });
}
