import { z } from 'zod';
import { router, publicProcedure } from '../index';
import { Category, UICategory } from '../../../types/api';

// CentralApp API base URL for category endpoints
const CENTRALAPP_API_BASE = 'https://dev.centralapp.com/api/v2';

/**
 * Transform API category to UI-friendly format with localized names
 */
function transformCategory(category: Category, language: string = 'en'): UICategory {
  return {
    id: category.id.toString(),
    name: category.translations[language as keyof typeof category.translations] || category.name,
    path: category.path,
    description: category.translations[language as keyof typeof category.translations] || category.name,
  };
}

/**
 * Fetch categories from CentralApp API with search term and filters
 */
async function fetchCategoriesFromAPI(
  searchTerm: string, 
  language: string = 'en', 
  level: string = 'L1'
): Promise<Category[]> {
  try {
    // Build API URL with search parameters
    const url = `${CENTRALAPP_API_BASE}/static/categories/like?name=${encodeURIComponent(searchTerm)}&language=${language}&level=${level}`;
    console.log('Fetching from CentralApp API:', url);
    
    // Make API request
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('API Response:', data);
    
    // Handle different response formats
    return Array.isArray(data) ? data : data.categories || [];
  } catch (error) {
    console.error('Error fetching categories from CentralApp API:', error);
    throw error;
  }
}

/**
 * Categories tRPC router with search functionality
 */
export const categoriesRouter = router({
  // Search categories procedure with pagination and filtering
  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
        language: z.string().default('en'),
        level: z.string().default('L1'),
      })
    )
    .query(async ({ input }) => {
      console.log("search procedure called", input);
      const { query, page, limit, language, level } = input;
      
      // Require at least 2 characters for search
      if (query.length < 2) {
        return {
          categories: [],
          total: 0,
          page,
          limit,
        };
      }

      try {
        // Fetch and transform categories from external API
        const apiCategories = await fetchCategoriesFromAPI(query, language, level);
        const transformedCategories = apiCategories.map(cat => transformCategory(cat, language));
        
        // Apply pagination to results
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedCategories = transformedCategories.slice(start, end);

        return {
          categories: paginatedCategories,
          total: transformedCategories.length,
          page,
          limit,
        };
      } catch (error) {
        console.error('Error in search procedure:', error);
        // Return empty results on error
        return {
          categories: [],
          total: 0,
          page,
          limit,
        };
      }
    })
});