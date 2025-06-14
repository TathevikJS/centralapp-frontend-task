import { api } from '../trpc/react';

export function useSearchCategories(input: { query: string; page: number; limit: number }) {
  try {
    return api.categories.search.useQuery(input, {
      enabled: input.query.length >= 2,
      refetchOnWindowFocus: false,
    });
  } catch (error) {
    console.error(error);
    return {
      data: null,
      isLoading: false,
    };
  }
}

export function useSelectedCategories(ids: string[]) {
  try {
    return api.categories.getSelected.useQuery({ ids }, {
      enabled: ids.length > 0,
    });
  } catch (error) {
    console.error(error);
    return {
      data: null,
      isLoading: false,
    };
  }
} 