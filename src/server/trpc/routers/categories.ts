import { z } from 'zod';
import { router, publicProcedure } from '../index';
import { mockCategories } from '../../../data/mockCategories';

console.log("categoriesRouter loaded");

export const categoriesRouter = router({
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        page: z.number().min(1),
        limit: z.number().min(1).max(50),
      })
    )
    .query(async ({ input }) => {
      console.log("search procedure called", input);
      const { query, page, limit } = input;
      console.log(query, page, limit);
      
      await new Promise(resolve => setTimeout(resolve, 500));

      const filteredCategories = mockCategories.filter(category => 
        category.name.toLowerCase().includes(query.toLowerCase()) ||
        category.path.toLowerCase().includes(query.toLowerCase())
      );

      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedCategories = filteredCategories.slice(start, end);

      return {
        categories: paginatedCategories,
        total: filteredCategories.length,
        page,
        limit,
      };
    }),

  getSelected: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string()),
      })
    )
    .query(async ({ input }) => {
      const { ids } = input;
      
      await new Promise(resolve => setTimeout(resolve, 300));

      const selectedCategories = mockCategories.filter(category => 
        ids.includes(category.id)
      );

      return {
        categories: selectedCategories,
      };
    }),
}); 