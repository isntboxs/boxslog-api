/**
 * Node modules
 */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/**
 * Types
 */
import type { ErrorResponse } from '@/types/api-response';
import type { NotFoundHandler } from 'hono';

const notFound: NotFoundHandler = c => {
  return c.json<ErrorResponse>(
    {
      success: false,
      message: `${ReasonPhrases.NOT_FOUND} - ${c.req.path}`,
      error: {
        code: StatusCodes.NOT_FOUND,
        details: {
          url: c.req.url,
          path: c.req.path,
          method: c.req.method,
          timestamp: new Date().toISOString(),
        },
      },
    },
    StatusCodes.NOT_FOUND
  );
};

export default notFound;
