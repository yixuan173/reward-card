import { useEffect, useState } from 'react';

import type { CardData, SortType } from '@type/common';
import Header from '@components/Header';
import { MAX_CARD_COUNT, SORT_TYPE } from '@constants/index';
import { getCardListFromIndexedDB } from '@util/indexedDB';
import Card from './components/Card';
import { Select } from '@chakra-ui/react';

const handleSortCardList = (e: React.ChangeEvent<HTMLSelectElement> | SortType, list: CardData[]): CardData[] => {
  const sortType = typeof e === 'string' ? e : (e.target.value as SortType);
  const sortFunctions: Record<SortType, (a: CardData, b: CardData) => number> = {
    timeASC: (a, b) => a.create - b.create,
    timeDESC: (a, b) => b.create - a.create,
    totalPointsASC: (a, b) => a.totalPoints - b.totalPoints,
    totalPointsDESC: (a, b) => b.totalPoints - a.totalPoints,
    currentPointsASC: (a, b) => a.currentPoints - b.currentPoints,
    currentPointsDESC: (a, b) => b.currentPoints - a.currentPoints,
  };

  const sortFunction = sortFunctions[sortType];
  return sortFunction ? [...list].sort(sortFunction) : list;
};

const RewardCardList = () => {
  const [cardList, setCardList] = useState<CardData[]>([]);

  useEffect(() => {
    const getCardList = async () => {
      const cardList = await getCardListFromIndexedDB();
      setCardList(handleSortCardList(SORT_TYPE.TIME_ASC, cardList));
    };

    getCardList();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen mb-12">
      <Header />
      <section className="mt-12 w-full px-6 pb-8 max-w-lg">
        <div className="flex justify-between items-center">
          <span className="font-bold text-pink-600 text-lg">
            卡片數量：{cardList.length} / {MAX_CARD_COUNT}
          </span>
          <Select
            size="sm"
            width="150px"
            bg="white"
            borderColor="pink.300"
            onChange={(e) => setCardList(handleSortCardList(e, cardList))}
          >
            <option value={SORT_TYPE.TIME_ASC} defaultChecked>
              建立時間遠到近
            </option>
            <option value={SORT_TYPE.TIME_DESC}>建立時間近到遠</option>
            <option value={SORT_TYPE.TOTAL_POINTS_ASC}>總點數小到大</option>
            <option value={SORT_TYPE.TOTAL_POINTS_DESC}>總點數大到小</option>
            <option value={SORT_TYPE.CURRENT_POINTS_ASC}>獲得點數小到大</option>
            <option value={SORT_TYPE.CURRENT_POINTS_DESC}>獲得點數大到小</option>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-4">
          {cardList.map(({ id, title, currentPoints, cardImage }: CardData) => (
            <Card key={id} id={id} title={title} currentPoints={currentPoints} cardImage={cardImage} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RewardCardList;
