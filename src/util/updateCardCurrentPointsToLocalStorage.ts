import type { CardData } from '@type/common';
import { getItemFromLocalStorage, setItemToLocalStorage } from './localStorage';

const updateCardCurrentPointsToLocalStorage = (cardId: string, points: number) => {
  const rewardCardList = getItemFromLocalStorage('rewardCardList') as CardData[];

  const updatedRewardCardList = rewardCardList.map((card: CardData) => {
    if (card.id === cardId) {
      return { ...card, currentPoints: card.currentPoints + points };
    }
    return card;
  });

  setItemToLocalStorage<CardData[]>('rewardCardList', updatedRewardCardList);
};

export default updateCardCurrentPointsToLocalStorage;
