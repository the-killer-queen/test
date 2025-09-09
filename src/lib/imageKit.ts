'use server';

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT!,
});

export async function uploadImageKitAction(file: File, imageName: string) {
  try {
    const arrBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrBuffer);
    const base64 = buffer.toString('base64');
    const dataUrl = `data:${file.type};base64,${base64}`;

    const result = await imagekit.upload({
      file: dataUrl,
      fileName: imageName,
      folder: '/menu_items_pictures',
      useUniqueFileName: true,

      transformation: {
        post: [
          {
            type: 'transformation',
            value: 'f-webp,q-70',
          },
        ],
      },
    });

    return result;
  } catch (error) {
    throw error;
  }
}
