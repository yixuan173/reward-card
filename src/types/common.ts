export interface RedemptionData {
  id: string;
  content: string;
  points: number;
}

export interface CardData {
  id: string;
  title: string;
  totalPoints: number;
  currentPoints: number;
  redemptionList: RedemptionData[];
  cardHeaderImage: string;
  pointImage: string;
  cardImage: string;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
}
