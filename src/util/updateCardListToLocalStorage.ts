import type { CardData } from '@type/common';
import { getItemFromLocalStorage } from './localStorage';

const updateCardListToLocalStorage = (cardId: string, points: number) => {
  const rewardCardList = getItemFromLocalStorage('rewardCardList') as CardData[];

  const updatedRewardCardList = rewardCardList.map((card: CardData) => {
    if (card.id === cardId) {
      return { ...card, currentPoints: card.currentPoints + points };
    }
    return card;
  });

  localStorage.setItem('rewardCardList', JSON.stringify(updatedRewardCardList));
};

export default updateCardListToLocalStorage;
