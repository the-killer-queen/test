import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

function MenuTableHeader() {
  return (
    <TableHeader>
      <TableRow>
        <TableHead></TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Category</TableHead>
        <TableHead>Ingredients</TableHead>
        <TableHead>Price</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>
  );
}

export default MenuTableHeader;
