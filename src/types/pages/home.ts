import type { CardData } from '@type/common';

export interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export type CardFormData = Omit<CardData, 'id' | 'createDate' | 'currentPoints'>;
