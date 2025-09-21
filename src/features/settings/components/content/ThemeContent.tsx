'use client';

import { Badge } from '@/components/ui/badge';
import { CardContent } from '@/components/ui/card';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { themes } from '../../constant/constant';

function ThemeContent() {
  const { theme: selectedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <CardContent>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {themes.map((theme) => {
          const IconComponent = theme.icon;
          return (
            <div
              key={theme.id}
              className={`group relative cursor-pointer rounded-lg p-4 ring-2 transition-all ${
                selectedTheme === theme.id
                  ? 'ring-primary/20 bg-primary/5'
                  : 'ring-border hover:bg-accent/50'
              }`}
              onClick={() => setTheme(theme.id)}
            >
              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <IconComponent className='h-5 w-5' />
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
                <Badge className='absolute -top-1 -right-1' variant='secondary'>
                  Active
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </CardContent>
  );
}

export default ThemeContent;
