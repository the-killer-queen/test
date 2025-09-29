'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PieChart as PieChartIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Cell, Pie, PieChart } from 'recharts';

type TopSalesData = {
  name: string;
  value: number;
  fill: string;
};

type TopSalesPieChartProps = {
  data: TopSalesData[];
  period: string;
};

const chartConfig = {
  value: {
    label: 'Sales',
  },
};

function TopSalesPieChart({ data, period }: TopSalesPieChartProps) {
  const t = useTranslations('analytics');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <PieChartIcon className='h-5 w-5' />
          {t('charts.topSales.title')}
        </CardTitle>
        <CardDescription>
          {t('charts.topSales.description', { period })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default TopSalesPieChart;