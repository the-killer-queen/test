'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Check, Globe } from 'lucide-react';
import { useState } from 'react';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fa', name: 'فارسی', flag: '🇮🇷' },
];

function LanguageSelector() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Globe className='h-5 w-5' />
          Language & Region
        </CardTitle>
        <CardDescription>
          Choose your preferred language for the interface
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {languages.map((language) => (
            <div
              key={language.code}
              className={`group relative cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-primary/50 ${
                selectedLanguage === language.code
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:bg-accent/50'
              }`}
              onClick={() => setSelectedLanguage(language.code)}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                  <span className='text-2xl'>{language.flag}</span>
                  <div>
                    <h3 className='font-medium'>{language.name}</h3>
                    <p className='text-muted-foreground text-sm'>
                      {language.code.toUpperCase()}
                    </p>
                  </div>
                </div>
                {selectedLanguage === language.code && (
                  <div className='bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-full'>
                    <Check className='h-4 w-4' />
                  </div>
                )}
              </div>
              {selectedLanguage === language.code && (
                <Badge className='absolute -right-1 -top-1' variant='default'>
                  Active
                </Badge>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default LanguageSelector;