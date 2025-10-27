/**
 * Node modules
 */
import * as z from 'zod';

/**
 * Configs
 */
import {
  DEFAULT_MAX_LIMIT,
  DEFAULT_MIN_LIMIT,
  DEFAULT_MIN_PAGE,
} from '@/configs';

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

const sortBySchema = z.enum(['latest', 'oldest']);

export const paginationBlogsSchema = z.object({
  limit: z.coerce
    .number()
    .int()
    .min(DEFAULT_MIN_LIMIT, { error: 'Limit must be at least 1' })
    .max(DEFAULT_MAX_LIMIT, { error: 'Limit must be at most 50' })
    .optional()
    .default(DEFAULT_MIN_LIMIT),
  page: z.coerce
    .number()
    .int()
    .min(DEFAULT_MIN_PAGE, { error: 'Page must be at least 1' })
    .optional()
    .default(DEFAULT_MIN_PAGE),
  sortBy: sortBySchema.optional().default('latest'),
});
