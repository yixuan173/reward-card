import { Link } from 'react-router-dom';
import { Tag, TagLabel } from '@chakra-ui/react';

import type { CardData } from '@type/common';
import { getItemFromLocalStorage } from '@util/localStorage';
import { LOCAL_STORAGE_KEYS } from '@constants/index';

const RewardCardList = () => {
  const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST) as CardData[];

  return (
    <div className="flex flex-col items-center h-screen mb-12">
      <Link to="/">
        <h1 className="text-5xl font-bold text-pink-400 mt-6">乖寶寶集點卡</h1>
      </Link>
      <section className="mt-12 w-full grid grid-cols-2 gap-8 px-6 pb-8">
        {rewardCardList.map((card: CardData) => (
          <Link to={`/${card.id}`} key={card.id}>
            <div className="w-full relative flex flex-col items-center">
              <img src="/images/card.webp" alt={card.title} className="w-11/12" />
              <h2 className="text-2xl font-bold text-pink-600">{card.title}</h2>
              <Tag size="lg" colorScheme="red" borderRadius="full" className="absolute -top-3 -right-1">
                <TagLabel>{card.currentPoints}</TagLabel>
              </Tag>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};

export default RewardCardList;
