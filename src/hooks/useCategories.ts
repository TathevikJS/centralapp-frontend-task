import { useMemo } from 'react';
import { api } from '../trpc/react';
import { useDebounce } from '../hooks/useDebounce';

export function useSearchCategories(input: {
  query: string;
  page: number;
  limit: number;
  language?: string;
  level?: string;
}) {
  const debouncedQuery = useDebounce(input.query.trim(), 300);

  const enabled = useMemo(() => debouncedQuery.length >= 2, [debouncedQuery]);

  const language = useMemo(() => input.language || 'en', [input.language]);
  const level = useMemo(() => input.level || 'L1', [input.level]);
  const page = useMemo(() => input.page || 1, [input.page]);
  const limit = useMemo(() => input.limit || 10, [input.limit]);

  const queryInput = useMemo(() => ({
    query: debouncedQuery,
    page: input.page,
    limit: input.limit,
    level: input.level || 'L1',
    language: input.language,
  }), [debouncedQuery, page, limit, level, language]);

  const query = api.categories.search.useQuery(queryInput, {
    enabled,
    refetchOnWindowFocus: false,
    staleTime: 30_000,
    placeholderData: (prev) => prev, // keep showing last results
  });

  return query;
}

export function useSelectedCategories(ids: string[], language?: string) {
  const queryInput = useMemo(() => ({
    ids,
    language,
  }), [ids, language]);

  const query = api.categories.getSelected.useQuery(queryInput, {
    enabled: ids.length > 0,
    refetchOnWindowFocus: false,
  });

  return query;
} 

