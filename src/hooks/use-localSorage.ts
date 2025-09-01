import { useEffect, useState } from 'react';

function getMenuCount<T>(defaultValue: T, key: string) {
  if (typeof window === 'undefined') return defaultValue;
  return localStorage.getItem(key)
    ? JSON.parse(localStorage.getItem(key)!)
    : defaultValue;
}

export function useLocalSorage<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState<T>(() =>
    getMenuCount<T>(defaultValue, key),
  );

  useEffect(
    function () {
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
    [value, key],
  );

  return [value, setValue];
}
