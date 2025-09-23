import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExcludedColumnsStore {
  excludedColumns: string[];
  setExcludedColumns: (columns: string[]) => void;
}

export const useExcludedColumnsQuery = create<ExcludedColumnsStore>()(
  persist(
    (set) => ({
      excludedColumns: [],
      setExcludedColumns: (columns: string[]) =>
        set({ excludedColumns: columns }),
    }),
    { name: 'excluded_columns' },
  ),
);
