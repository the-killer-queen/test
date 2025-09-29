'use client';

import { useTranslations } from 'next-intl';
import { parseAsString, useQueryState } from 'nuqs';
import { useMemo } from 'react';
import MonthlySalesChart from '../cards/MonthlySalesChart';
import QuickStatsCards from '../cards/QuickStatsCards';
import RecentOrdersCard from '../cards/RecentOrdersCard';
import TopSalesPieChart from '../cards/TopSalesPieChart';
import { generateMockAnalyticsData } from '../../lib/mockData';

function AnalyticsContent() {
  const t = useTranslations('analytics');
  const [period] = useQueryState('period', parseAsString.withDefault('30d'));
  const [customDate] = useQueryState('custom_date', parseAsString);

  const mockData = useMemo(() => {
    return generateMockAnalyticsData(period, customDate);
  }, [period, customDate]);

  const periodLabel = useMemo(() => {
    if (period === 'custom' && customDate) {
      return t('periods.customDate', { date: customDate });
    }
    return t(`periods.${period}`);
  }, [period, customDate, t]);

  return (
    <div className='space-y-6'>
      {/* Stats Cards Row */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        <QuickStatsCards data={mockData.stats} period={periodLabel} />
      </div>

      {/* Charts Row */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
        <MonthlySalesChart data={mockData.monthlySales} period={periodLabel} />
        <TopSalesPieChart data={mockData.topSales} period={periodLabel} />
      </div>

      {/* Recent Orders */}
      <RecentOrdersCard orders={mockData.recentOrders} period={periodLabel} />
    </div>
  );
}

export default AnalyticsContent;