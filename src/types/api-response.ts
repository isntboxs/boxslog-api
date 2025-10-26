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
