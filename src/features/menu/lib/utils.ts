import { MenuRow } from '@/types/tables';
import { SortDirection, SortField, Tag } from '../schema/types';

export function searchMenuItems(query: string, menu: MenuRow[]) {
  return menu.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.tag?.name.toLowerCase().includes(query.toLowerCase()),
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

export function filterMenuItems(filterBy: string | undefined, menu: MenuRow[]) {
  const selectedFilters = filterBy?.split('%');
  return selectedFilters
    ? menu.filter((item) =>
        selectedFilters.find(
          (filter) => item.tag?.name.toLowerCase() == filter.toLowerCase(),
        ),
      )
    : menu;
}

export function menuFilterOptions(categories: { tag: Tag | null }[]) {
  return categories.map((cat) => ({
    label: cat.tag!.name,
    value: cat.tag!.name,
    iconName: cat.tag?.icon,
  }));
}
