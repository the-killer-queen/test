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
import { TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

type MonthlySalesData = {
  month: string;
  sales: number;
  orders: number;
};

type MonthlySalesChartProps = {
  data: MonthlySalesData[];
  period: string;
};

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
  orders: {
    label: 'Orders',
    color: 'hsl(var(--chart-2))',
  },
};

function MonthlySalesChart({ data, period }: MonthlySalesChartProps) {
  const t = useTranslations('analytics');

  return (
    <Card className='lg:col-span-2'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <TrendingUp className='h-5 w-5' />
              {t('charts.monthlySales.title')}
            </CardTitle>
            <CardDescription>
              {t('charts.monthlySales.description', { period })}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="sales"
              fill="var(--color-sales)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="orders"
              fill="var(--color-orders)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export default MonthlySalesChart;