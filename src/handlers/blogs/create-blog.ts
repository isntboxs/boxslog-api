/**
 * Node modules
 */
import { zValidator } from '@hono/zod-validator';
import { StatusCodes } from 'http-status-codes';

/**
 * Custom modules
 */
import factory from '@/lib/factory';
import requireAuth from '@/middlewares/auth';
import { genSlug } from '@/utils/gen-slug';

/**
 * Validations
 */
import { createBlogSchema } from '@/validations/blogs';

/**
 * Types
 */
import type { SuccessResponse } from '@/types/api-response';

// create blog (private)
export const create = factory.createHandlers(
  requireAuth,
  zValidator('json', createBlogSchema),
  async c => {
    const { content, description, status, title } = c.req.valid('json');
    const slug = genSlug(title);

    const user = c.get('user')!;

    const newBlog = await c.var.db.blog.create({
      data: {
        title,
        slug,
        content,
        description,
        status,
        author: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    c.var.logger.info(newBlog, 'New blog created');

    return c.json<SuccessResponse<{ blogId: string }>>(
      {
        success: true,
        message: 'Blog created successfully',
        data: {
          blogId: newBlog.id,
        },
      },
      StatusCodes.CREATED
    );
  }
);
