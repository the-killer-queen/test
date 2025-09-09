import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PageProps } from '@/types';
import { DollarSign, ListTree, Tag, Utensils } from 'lucide-react';

const headers = [
  { value: 'menu_item_picture', label: '' },
  { value: 'name', label: 'Name', icon: Tag },
  { value: 'category', label: 'Category', icon: ListTree },
  { value: 'ingredients', label: 'Ingredients', icon: Utensils },
  { value: 'price', label: 'Price', icon: DollarSign },
];

async function MenuTableHeader({ searchParams }: PageProps) {
  const params = await searchParams;
  const excludedColumns = params?.excluded_columns
    ? params.excluded_columns.split('%')
    : [];

  return (
    <TableHeader>
      <TableRow>
        {headers
          .filter((header) => !excludedColumns.includes(header.value))
          .map((header) => (
            <TableHead key={header.value}>
              <span className='flex items-center gap-1'>
                {header.icon && <header.icon className='size-3 md:size-4' />}
                {header.label}
              </span>
            </TableHead>
          ))}

        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MenuTableHeader;
