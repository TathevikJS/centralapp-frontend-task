import { useMemo } from 'react';
import { api } from '../trpc/react';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Hook for searching categories with debouncing and pagination
 */
export function useSearchCategories(input: {
  query: string;
  page: number;
  limit: number;
  language?: string;
  level?: string;
}) {
  // Debounce search query to avoid excessive API calls
  const debouncedQuery = useDebounce(input.query.trim(), 300);

  // Only enable query if search term has at least 2 characters
  const enabled = useMemo(() => debouncedQuery.length >= 2, [debouncedQuery]);

  // Set default values for optional parameters
  const language = useMemo(() => input.language || 'en', [input.language]);
  const level = useMemo(() => input.level || 'L1', [input.level]);
  const page = useMemo(() => input.page || 1, [input.page]);
  const limit = useMemo(() => input.limit || 10, [input.limit]);

  // Memoized query input to prevent unnecessary re-renders
  const queryInput = useMemo(() => ({
    query: debouncedQuery,
    page: input.page,
    limit: input.limit,
    level: input.level || 'L1',
    language: input.language,
  }), [debouncedQuery, page, limit, level, language]);

  // Execute tRPC query with optimizations
  const query = api.categories.search.useQuery(queryInput, {
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 30_000, // Cache results for 30 seconds
    placeholderData: (prev) => prev, // Keep showing previous results while loading
  });

  return query;
}

