import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export function useFiltersQuery(name?: string) {
  const [filters, setFilter] = useQueryState(
    name || 'filter_by',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  return { filters, setFilter };
}
