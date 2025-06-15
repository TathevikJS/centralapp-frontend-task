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

  // Check if user is actively typing (non-debounced query differs from debounced)
  const isTyping = useMemo(() => 
    input.query.trim() !== debouncedQuery && input.query.trim().length >= 2, 
    [input.query, debouncedQuery]
  );

  // Execute tRPC query with proper loading states
  const query = api.categories.search.useQuery(queryInput, {
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 5_000, // Reduced cache time for more responsive loading
    retry: 1, // Retry failed requests once
    // Remove placeholder data to show proper loading states
  });

  // Enhanced loading state that covers all scenarios
  const isLoadingState = useMemo(() => {
    // Show loading if:
    // 1. User is typing and query will be enabled
    // 2. tRPC query is actually loading/fetching
    // 3. Query is enabled but no data yet
    return isTyping || query.isLoading || query.isFetching || (enabled && !query.data);
  }, [isTyping, query.isLoading, query.isFetching, enabled, query.data]);

  console.log('🔍 Search loading state:', {
    originalQuery: input.query.trim(),
    debouncedQuery,
    enabled,
    isTyping,
    tRPCLoading: query.isLoading,
    tRPCFetching: query.isFetching,
    hasData: !!query.data,
    finalLoading: isLoadingState
  });

  return {
    ...query,
    isLoading: isLoadingState,
  };
}

