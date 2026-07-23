import ImageKit from 'imagekit';
import { env } from '../config/env';

export let imagekit: ImageKit | null = null;

if (env.IMAGEKIT_PUBLIC_KEY && env.IMAGEKIT_PRIVATE_KEY && env.IMAGEKIT_URL_ENDPOINT) {
  imagekit = new ImageKit({
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey: env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT,
  });
}

export async function uploadImageToImageKit(
  fileBuffer: Buffer,
  fileName: string
): Promise<string> {
  if (!imagekit) {
    throw new Error('ImageKit environment variables are not configured');
  }

  const result = await imagekit.upload({
    file: fileBuffer,
    fileName,
    folder: '/vehicles',
  });

  return result.url;
}
