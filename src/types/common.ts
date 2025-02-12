import { SORT_TYPE } from '@constants/index';

export interface RedemptionData {
  id: string;
  content: string;
  points: number;
}

export interface ImageData {
  buffer: ArrayBuffer | null;
  type: string;
}

export interface CardData {
  id: string;
  title: string;
  totalPoints: number;
  currentPoints: number;
  redemptionList: RedemptionData[];
  cardHeaderImage: ImageData;
  pointImage: ImageData;
  cardImage: ImageData;
  create: number;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type Error = Partial<Record<keyof CardData | keyof RedemptionData, string>>;

export type SortType = (typeof SORT_TYPE)[keyof typeof SORT_TYPE];
