import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export function useFiltersQuery() {
  const [filters, setFilter] = useQueryState(
    'filter_by',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  return { filters, setFilter };
}
