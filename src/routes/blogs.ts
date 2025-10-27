/**
 * Custom modules
 */
import factory from '@/lib/factory';

/**
 * Handlers
 */
import { create } from '@/handlers/blogs/create-blog';
import { getAll } from '@/handlers/blogs/get-all-blogs';

const blogRoute = factory.createApp().basePath('/blogs');
// Get all blogs
blogRoute.get('/', ...getAll);

// Create blog
blogRoute.post('/', ...create);

export default blogRoute;
