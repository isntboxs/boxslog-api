/**
 * Custom modules
 */
import factory from '@/lib/factory';

/**
 * Handlers
 */
import { create } from '@/handlers/blogs/create-blog';

const blogRoute = factory.createApp().basePath('/blogs');

blogRoute.post('/', ...create);

export default blogRoute;
