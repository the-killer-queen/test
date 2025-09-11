import { MenuRow } from '@/types/tables';
import { SortDirection, SortField } from './types';

export function searchMenuItems(query: string, menu: MenuRow[]) {
  return menu.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category?.toLowerCase().includes(query.toLowerCase()),
  );
}

export function sortMenuItems(sortBy: string, menu: MenuRow[]) {
  const [field, direction] = sortBy.split('-') as [SortField, SortDirection];
  const modifier = direction === 'asc' ? 1 : -1;

  return menu.sort((a, b) => {
    const valueA = a[field];
    const valueB = b[field];

    if (field === 'price') return (Number(valueA) - Number(valueB)) * modifier;

    if (field === 'created_at')
      return (
        (Number(new Date(valueA as string)) -
          Number(new Date(valueB as string))) *
        modifier
      );

    if (field === 'name')
      return (valueA as string).localeCompare(valueB as string) * modifier;

    return 0;
  });
}

export function filterMenuItems(filters: string[], menu: MenuRow[]) {
  return filters.length > 0
    ? menu.filter((item) =>
        filters.find(
          (filter) => item.category?.toLowerCase() == filter.toLowerCase(),
        ),
      )
    : menu;
}

export function menuFilterOptions(
  categories: { name: string; icon_name: string | null }[],
) {
  return categories.map((cat) => ({
    label: cat.name,
    value: cat.name,
    iconName: cat?.icon_name || '',
  }));
}
