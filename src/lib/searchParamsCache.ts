import { createSearchParamsCache, parseAsString } from 'nuqs/server';

export const searchParamsCache = createSearchParamsCache({
  selected_date: parseAsString.withDefault(
    new Date().toISOString().split('T')[0],
  ),
});
