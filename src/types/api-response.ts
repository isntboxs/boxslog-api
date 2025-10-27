export type SuccessResponse<T = void> = {
  success: true;
  message: string;
} & (T extends void ? object : { data: T });

export type ErrorResponse = {
  success: false;
  message: string;
  error?: {
    code?: number;
    details?: unknown;
    stack?: string;
  };
};

export type PaginatedResponse<T> = {
  data: T;
  meta: {
    limit: number;
    offset: number;
    page: number;
    totalPages: number;
    totalItems: number;
  };
} & Omit<SuccessResponse, 'data'>;

export interface BlogResponse {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  viewsCount: number;
  likesCount: number;
  commentsCount: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    name: string;
    image: string | null;
    username: string | null;
  };
}
