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
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type Error = Partial<Record<keyof CardData | keyof RedemptionData, string>>;
