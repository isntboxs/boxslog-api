/**
 * Node modules
 */
import { zValidator } from '@hono/zod-validator';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom modules
 */
import factory from '@/lib/factory';

/**
 * Validations
 */
import { paginationBlogsSchema } from '@/validations/blogs';

/**
 * Types
 */
import type { BlogResponse, PaginatedResponse } from '@/types/api-response';

export const getAll = factory.createHandlers(
  zValidator('query', paginationBlogsSchema),
  async c => {
    const { limit, page, sortBy } = c.req.valid('query');
    const offset = (page - 1) * limit;

    const orderBy = sortBy === 'latest' ? 'desc' : 'asc';

    const blogs = await c.var.db.blog.findMany({
      take: limit,
      skip: offset,
      orderBy: {
        createdAt: orderBy,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        content: true,
        likesCount: true,
        viewsCount: true,
        commentsCount: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
          },
        },
      },
    });

    const totalItems = await c.var.db.blog.count();

    return c.json<PaginatedResponse<BlogResponse[]>>(
      {
        success: true,
        message: 'Blogs fetched successfully',
        data: blogs,
        meta: {
          limit,
          offset,
          page,
          totalPages: Math.ceil(totalItems / limit),
          totalItems,
        },
      },
      StatusCodes.OK
    );
  }
);
