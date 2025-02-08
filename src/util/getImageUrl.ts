import type { ImageData } from '@type/common';

/**
 * Takes an image object and returns a URL that can be used as the `src`
 * attribute of an `<img>` element.
 *
 * @param image The image object to get the URL for.
 * @returns A URL that can be used as the `src` attribute of an `<img>` element.
 */
const getImageUrl = (image: ImageData | null): string => {
  if (!image?.buffer || !(image.buffer instanceof ArrayBuffer)) {
    return '';
  }

  const blob = new Blob([image.buffer], { type: image.type });
  return URL.createObjectURL(blob);
};

export default getImageUrl;
