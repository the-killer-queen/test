'use server';

import sharp from 'sharp';

export async function handleImageCompression(file: File) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const compressedBuffer = await sharp(buffer)
      .resize(1920, 1920, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 90 })
      .toBuffer();

    const compressedFile = new File(
      [new Uint8Array(compressedBuffer)],
      file.name.replace(/\.[^/.]+$/, '.webp'),
      { type: 'image/webp', lastModified: Date.now() },
    );

    return compressedFile;
  } catch (error) {
    console.log(error);
  }
}
