import type { CardData } from '@type/common';
import { getItemFromLocalStorage, setItemToLocalStorage } from './localStorage';
import { LOCAL_STORAGE_KEYS } from '@constants/index';

const updateCardCurrentPointsToLocalStorage = (cardId: string, points: number) => {
  const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST) as CardData[];

  const updatedRewardCardList = rewardCardList.map((card: CardData) => {
    if (card.id === cardId) {
      return { ...card, currentPoints: card.currentPoints + points };
    }
    return card;
  });

  setItemToLocalStorage<CardData[]>(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST, updatedRewardCardList);
};

export default updateCardCurrentPointsToLocalStorage;
