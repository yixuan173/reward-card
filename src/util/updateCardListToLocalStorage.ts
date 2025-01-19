import type { CardData } from '@/types/common';

const updateCardListToLocalStorage = (cardId: string, points: number) => {
  const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
  const rewardCardList = JSON.parse(rewardCardListFromLocalStorage);

  const updatedRewardCardList = rewardCardList.map((card: CardData) => {
    if (card.id === cardId) {
      return { ...card, currentPoints: card.currentPoints + points };
    }
    return card;
  });

  localStorage.setItem('rewardCardList', JSON.stringify(updatedRewardCardList));
};

export default updateCardListToLocalStorage;
