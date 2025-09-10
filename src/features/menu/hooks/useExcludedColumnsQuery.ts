import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';

export function useExcludedColumnsQuery() {
  const [excludedColumns, setExcludedColumns] = useQueryState(
    'excluded_columns',
    parseAsArrayOf(parseAsString).withDefault([]),
  );

  return { excludedColumns, setExcludedColumns };
}
