import type { BaseModalProps, CardData } from '@type/common';
export interface ActionButtonsProps {
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData | null>>;
}

export interface CardModalProps extends BaseModalProps, ActionButtonsProps {}
