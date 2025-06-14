import { api } from '../trpc/react';

export function useSearchCategories(input: { 
  query: string; 
  page: number; 
  limit: number;
  language?: string;
  level?: string;
}) {
  try {
    return api.categories.search.useQuery({
      query: input.query,
      page: input.page,
      limit: input.limit,
      language: input.language || 'en',
      level: input.level || 'L1',
    }, {
      enabled: input.query.length >= 2,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    });
  } catch (error) {
    console.error('Error in useSearchCategories:', error);
    return {
      data: null,
      isLoading: false,
      error,
    };
  }
}

export function useSelectedCategories(ids: string[], language?: string) {
  try {
    return api.categories.getSelected.useQuery({ 
      ids,
      language: language || 'en'
    }, {
      enabled: ids.length > 0,
      refetchOnWindowFocus: false,
    });
  } catch (error) {
    console.error('Error in useSelectedCategories:', error);
    return {
      data: null,
      isLoading: false,
      error,
    };
  }
} 