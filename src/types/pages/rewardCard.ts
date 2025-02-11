import type { BaseModalProps, CardData, ImageData } from '@type/common';
export interface ActionButtonsProps {
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData | null>>;
}

export interface CardModalProps extends BaseModalProps, ActionButtonsProps {}

export interface PointsProps {
  totalPoints: number;
  currentPoints: number;
  pointImage: ImageData | null;
}
