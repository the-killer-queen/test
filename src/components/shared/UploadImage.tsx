'use client';

import { Lead } from '@/components/typography/Lead';
import { P } from '@/components/typography/P';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { type ControllerRenderProps, type FieldError } from 'react-hook-form';
import { useTranslations } from 'next-intl';

type UploadImageProps = {
  error: FieldError | undefined;
  defaultImageURL?: string | null;
  isAvatar?: boolean;
  avatarFallback?: string;
} & ControllerRenderProps;

function UploadImage({
  error,
  defaultImageURL,
  isAvatar = false,
  avatarFallback,
  ...field
}: UploadImageProps) {
  const t = useTranslations('menu');
  const [path, setPath] = useState<string | null>(null);

  return (
    <Dropzone
      accept={{
        'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp'],
      }}
      noKeyboard={true}
      multiple={false}
      maxSize={10 * 1024 * 1024}
      minSize={1}
      onDrop={(files) => {
        field.onChange(files?.at(0));
        setPath(URL.createObjectURL(files?.at(0) as Blob));
      }}
      onDropRejected={(rejectedFiles) => {
        console.error('Rejected files:', rejectedFiles);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => {
        if (isAvatar)
          return (
            <Avatar
              {...getRootProps({
                className: `group relative h-24 w-24 hover:cursor-pointer ${error ? 'ring-2 ring-red-500' : ''}`,
              })}
            >
              <input {...getInputProps()} />
              <AvatarImage
                src={path || defaultImageURL || undefined}
                alt='Profile picture'
                className='object-cover'
              />
              <AvatarFallback className='bg-primary/5 text-primary text-xl font-bold'>
                {avatarFallback}
              </AvatarFallback>
              <div className='bg-accent/75 text-muted-foreground absolute bottom-0 z-50 flex h-[60%] w-full translate-y-20 flex-col items-center px-3 py-0.5 text-center text-xs transition-transform group-hover:translate-y-0'>
                <Upload className='size-4' />
                {t('upload.uploadAvatar')}
              </div>
            </Avatar>
          );
        else
          return (
            <Card className='h-full overflow-hidden rounded-xl p-0'>
              {path && (
                <div className='relative h-48 w-full'>
                  <Image className='object-cover' fill src={path} alt={path} />
                </div>
              )}
              {defaultImageURL && !path && (
                <div className='relative h-48 w-full'>
                  <Image
                    className='object-cover'
                    fill
                    src={defaultImageURL}
                    alt={'menu item picture'}
                  />
                </div>
              )}

              <Card
                {...getRootProps({
                  className: `text-center cursor-pointer h-max border-none shadow-none ${error ? 'border-red-500' : ''} ${path || defaultImageURL ? 'rounded-none pt-0' : ''}`,
                })}
              >
                <CardContent>
                  <input {...getInputProps()} />

                  {field.value ? (
                    <div>
                      <P>{field.value.name}</P>
                      <P>
                        {t('upload.size', {
                          size: (field.value.size / 1024 / 1024).toFixed(2),
                        })}
                      </P>
                    </div>
                  ) : (
                    <div className='flex flex-col items-center gap-0.5'>
                      <Upload className='text-muted-foreground size-6' />
                      <Lead>{t('upload.title')}</Lead>
                      <P>
                        {isDragActive
                          ? t('upload.dropping')
                          : t('upload.dragDrop')}
                      </P>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Card>
          );
      }}
    </Dropzone>
  );
}

export default UploadImage;
