'use client';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Monitor, Moon, Palette, Sun } from 'lucide-react';
import { useState } from 'react';

const themes = [
  {
    id: 'light',
    name: 'Light',
    description: 'Clean and bright interface',
    icon: Sun,
    preview: 'bg-white border-gray-200',
    colors: ['bg-white', 'bg-gray-100', 'bg-gray-200'],
  },
  {
    id: 'dark',
    name: 'Dark',
    description: 'Easy on the eyes',
    icon: Moon,
    preview: 'bg-gray-900 border-gray-700',
    colors: ['bg-gray-900', 'bg-gray-800', 'bg-gray-700'],
  },
  {
    id: 'system',
    name: 'System',
    description: 'Follows your device settings',
    icon: Monitor,
    preview: 'bg-gradient-to-br from-white to-gray-900 border-gray-400',
    colors: ['bg-white', 'bg-gray-500', 'bg-gray-900'],
  },
];

function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState('system');

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
      <CardContent>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
          {themes.map((theme) => {
            const IconComponent = theme.icon;
            return (
              <div
                key={theme.id}
                className={`group relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                  selectedTheme === theme.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:bg-accent/50'
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <IconComponent className='h-5 w-5' />
                    {selectedTheme === theme.id && (
                      <div className='bg-primary text-primary-foreground flex h-5 w-5 items-center justify-center rounded-full'>
                        <Check className='h-3 w-3' />
                      </div>
                    )}
                  </div>

                  <div className={`h-16 rounded-md ${theme.preview} p-2`}>
                    <div className='flex h-full gap-1'>
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded ${color} opacity-80`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className='font-medium'>{theme.name}</h3>
                    <p className='text-muted-foreground text-sm'>
                      {theme.description}
                    </p>
                  </div>
                </div>

                {selectedTheme === theme.id && (
                  <Badge className='absolute -right-1 -top-1' variant='default'>
                    Active
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export default ThemeSelector;