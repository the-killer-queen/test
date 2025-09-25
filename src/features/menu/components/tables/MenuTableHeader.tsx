'use client';

import TableContentHeader from '@/components/shared/TableContentHeader';
import { useMenuTableHeaderColumns } from '../../lib/constant';

function MenuTableHeader() {
  const content = useMenuTableHeaderColumns();

  return <TableContentHeader columns={content} />;
}

export default MenuTableHeader;
