/**
 * Node modules
 */
import { StatusCodes, ReasonPhrases } from 'http-status-codes';

/**
 * Custom modules
 */
import factory from '@/lib/factory';

const indexRoute = factory.createApp().basePath('/');

indexRoute.get('/', c => {
  return c.json(
    {
      message: 'BoxsLog API is running!',
      status: ReasonPhrases.OK,
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    },
    StatusCodes.OK
  );
});

export default indexRoute;
