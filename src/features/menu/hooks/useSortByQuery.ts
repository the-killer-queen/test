import { parseAsString, useQueryState } from 'nuqs';

export function useSortByQuery() {
  const [sortBy, setSortBy] = useQueryState(
    'sort_by',
    parseAsString.withDefault('created_at-desc'),
  );

  return { sortBy, setSortBy };
}
