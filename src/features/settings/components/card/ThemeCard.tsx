import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Palette } from 'lucide-react';
import ThemeContent from '../content/ThemeContent';

function ThemeCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Palette className='h-5 w-5' />
          Appearance
        </CardTitle>
        <CardDescription>
          Customize the look and feel of your dashboard
        </CardDescription>
      </CardHeader>

      <ThemeContent />
    </Card>
  );
}

export default ThemeCard;
