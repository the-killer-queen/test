'use client';

import { Lead } from '@/components/typography/Lead';
import { P } from '@/components/typography/P';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { type ControllerRenderProps, type FieldError } from 'react-hook-form';

type UploadImageProps = {
  error: FieldError | undefined;
  defaultImageURL?: string | null;
} & ControllerRenderProps;

function UploadImage({ error, defaultImageURL, ...field }: UploadImageProps) {
  const [path, setPath] = useState<string | null>(null);

  return (
    <Dropzone
      accept={{
        'image/*': ['.png', '.gif', '.jpeg', '.jpg', '.webp'],
      }}
      noKeyboard={true}
      multiple={false}
      maxSize={50_000_000}
      minSize={1}
      onDrop={(files) => {
        field.onChange(files?.at(0));
        setPath(URL.createObjectURL(files?.at(0) as Blob));
      }}
      onDropRejected={(rejectedFiles) => {
        console.error('Rejected files:', rejectedFiles);
      }}
    >
      {({ getRootProps, getInputProps, isDragActive }) => (
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
                  <P>Size: {(field.value.size / 1024 / 1024).toFixed(2)} MB</P>
                </div>
              ) : (
                <div className='flex flex-col items-center gap-0.5'>
                  <Upload className='text-muted-foreground size-6' />
                  <Lead>Upload</Lead>
                  <P>
                    {isDragActive
                      ? 'Drop the image here...'
                      : 'Drag & drop an image here, or click to select'}
                  </P>
                </div>
              )}
            </CardContent>
          </Card>
        </Card>
      )}
    </Dropzone>
  );
}

export default UploadImage;
