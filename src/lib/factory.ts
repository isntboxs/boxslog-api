/**
 * Node modules
 */
import { createFactory } from 'hono/factory';

/**
 * Types
 */
import type { AppBindings } from '@/types/app-bindings';

export default createFactory<AppBindings>({
  defaultAppOptions: {
    strict: false,
  },
});
