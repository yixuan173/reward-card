import type { ImageData } from '@type/common';

/**
 * Takes an image object and returns a URL that can be used as the `src`
 * attribute of an `<img>` element.
 *
 * @param image The image object to get the URL for.
 * @param defaultUrl The URL to return if the image object is invalid.
 * @returns A URL that can be used as the `src` attribute of an `<img>` element.
 */
const getImageUrl = (image: ImageData | null, defaultUrl?: string): string => {
  if (!image?.buffer || !(image.buffer instanceof ArrayBuffer)) {
    return defaultUrl || '';
  }

  const blob = new Blob([image.buffer], { type: image.type });
  return URL.createObjectURL(blob);
};

export default getImageUrl;
