import { useEffect, useState } from 'react';

import type { CardData } from '@type/common';
import Header from '@components/Header';
import { MAX_CARD_COUNT } from '@constants/index';
import { getCardListFromIndexedDB } from '@util/indexedDB';
import Card from './components/Card';

const RewardCardList = () => {
  const [cardList, setCardList] = useState<CardData[]>([]);

  const getCardList = async () => {
    const cardList = await getCardListFromIndexedDB();
    setCardList(cardList);
  };

  useEffect(() => {
    getCardList();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen mb-12">
      <Header />
      <section className="mt-12 w-full px-6 pb-8 max-w-lg">
        <span className="font-bold text-pink-600 text-lg">
          卡片數量：{cardList.length} / {MAX_CARD_COUNT}
        </span>
        <div className="grid grid-cols-2 gap-8 mt-2">
          {cardList.map(({ id, title, currentPoints, cardImage }: CardData) => (
            <Card key={id} id={id} title={title} currentPoints={currentPoints} cardImage={cardImage} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RewardCardList;
