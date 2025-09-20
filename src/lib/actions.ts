'use server';

import sharp from 'sharp';

export async function handleImageCompression(
  file: File,
  width: number = 1920,
  height: number = 1920,
  isAvatar: boolean = false,
) {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    let sharpInstance = sharp(buffer);

    if (isAvatar) {
      const size = Math.min(width, height);
      sharpInstance = sharpInstance.resize(size, size, {
        fit: 'cover',
        position: 'center',
      });
    } else
      sharpInstance = sharpInstance.resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      });

    const compressedBuffer = await sharpInstance
      .webp({ quality: isAvatar ? 85 : 90 })
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
