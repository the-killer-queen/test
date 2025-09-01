import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useSetSearchParam() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function setSearchParam(name: string, value: string) {
    const search = new URLSearchParams(searchParams);
    search.set(name, value);

    router.push(`${pathname}?${search.toString()}`);
  }

  function removeSearchParam(name: string) {
    const search = new URLSearchParams(searchParams);
    search.delete(name);

    router.push(`${pathname}?${search.toString()}`);
  }

  function getSearchParam(name: string) {
    return searchParams.get(name);
  }

  return { getSearchParam, setSearchParam, removeSearchParam };
}
