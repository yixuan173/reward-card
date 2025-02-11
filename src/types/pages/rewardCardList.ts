import type { ImageData } from '@type/common';

export interface CardProps {
  id: string;
  title: string;
  currentPoints: number;
  cardImage: ImageData;
}
