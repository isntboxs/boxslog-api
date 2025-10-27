/**
 * Node modules
 */
import * as z from 'zod';

const blogStatus = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']);

export const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, { error: 'Title is required' })
    .max(180, { error: 'Title must be at most 180 characters long' }),
  description: z
    .string()
    .min(1, { error: 'Description is required' })
    .max(500, { error: 'Description must be at most 500 characters long' }),
  content: z
    .string()
    .min(1, { error: 'Content is required' })
    .max(10000, { error: 'Content must be at most 10000 characters long' }),
  status: blogStatus.default('DRAFT'),
});
