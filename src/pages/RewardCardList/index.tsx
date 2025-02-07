import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Tag, TagLabel } from '@chakra-ui/react';

import type { CardData } from '@type/common';
import Header from '@components/Header';
import { MAX_CARD_COUNT } from '@constants/index';
import { getCardListFromIndexedDB } from '@util/indexedDB';
import getImageUrl from '@/util/getImageUrl';

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
            <Link to={`/${id}`} key={id}>
              <div className="w-full relative flex flex-col items-center">
                <Image
                  src={getImageUrl(cardImage) || './images/card.webp'}
                  alt={title}
                  objectFit="cover"
                  className="w-full h-64"
                />
                <h2 className="text-2xl font-bold text-pink-600">{title}</h2>
                <Tag size="lg" colorScheme="red" borderRadius="full" className="absolute -top-3 -right-3">
                  <TagLabel>{currentPoints}</TagLabel>
                </Tag>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RewardCardList;
