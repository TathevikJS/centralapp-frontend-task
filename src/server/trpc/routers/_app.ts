import { router } from '../index';
import { categoriesRouter } from './categories';

export const appRouter = router({
  categories: categoriesRouter,
});

export type AppRouter = typeof appRouter; 