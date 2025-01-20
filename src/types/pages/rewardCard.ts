import type { BaseModalProps, CardData } from '@type/common';

export interface CardModalProps extends BaseModalProps {
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

export interface ActionButtonsProps {
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData>>;
}
