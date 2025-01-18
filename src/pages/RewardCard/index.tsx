import { CardData } from '@/types/common';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const getInitialCardData = (cardId: string) => {
  const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
  return JSON.parse(rewardCardListFromLocalStorage).find((card: CardData) => card.id === cardId);
};

const RewardCard = () => {
  const { cardId } = useParams<{ cardId: string }>();
  const [currentCardData, setCurrentCardData] = useState<CardData | null>(getInitialCardData(cardId));

  if (!currentCardData) return null;

  const handleAddPoint = () => {
    console.log(currentCardData);
  };

  const getPointsElements = () => {
    return Array.from({ length: currentCardData.totalPoints }, (_, index) => (
      <div
        key={index}
        className="w-16 h-16 border-solid border-4 rounded-xl border-pink-400 flex items-center justify-center"
      >
        <Text fontSize="2xl" as="b" color="pink.700" opacity={0.5}>
          {index + 1}
        </Text>
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Link to="/">
        <h1 className="text-5xl font-bold text-pink-400 mt-6">乖寶寶集點卡</h1>
      </Link>
      <section className="mt-12 w-full px-6">
        <div
          className="border-solid border-4 border-pink-400 rounded-xl p-4 flex flex-col items-center"
          onClick={handleAddPoint}
        >
          <img src="/images/cardHeader.gif" className="w-full max-h-[200px] object-cover" />
          <div className="grid grid-cols-5 gap-1">{getPointsElements()}</div>
        </div>
      </section>
    </div>
  );
};

export default RewardCard;
