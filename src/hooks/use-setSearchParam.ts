import { Options, useQueryState, UseQueryStateOptions } from 'nuqs';

export function useSetSearchParam(
  name: string,
  adaptor: Pick<UseQueryStateOptions<string>, keyof Options>,
) {
  const [query, setQuery] = useQueryState(name, adaptor);

  function setSearchParam(value: string) {
    setQuery((prev) =>
      prev?.includes(value) ? prev : [...(prev || []), value],
    );
  }

  function removeSearchParam() {
    setQuery(null);
  }

  const getSearchParam = query;

  return { getSearchParam, setSearchParam, removeSearchParam };
}
