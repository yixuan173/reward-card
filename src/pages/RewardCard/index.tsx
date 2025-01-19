import { CardData } from '@/types/common';
import { Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AddPointModal from './components/AddPointModal';

const getInitialCardData = (cardId: string) => {
  const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
  return JSON.parse(rewardCardListFromLocalStorage).find((card: CardData) => card.id === cardId);
};

const RewardCard = () => {
  const { cardId = '' } = useParams<{ cardId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCardData, setCurrentCardData] = useState<CardData>(getInitialCardData(cardId));
  const { totalPoints, currentPoints } = currentCardData || {};

  const handleAddPoint = (point: number) => {
    setCurrentCardData((prev) => {
      return { ...prev, currentPoints: prev.currentPoints + point };
    });

    onClose();
  };

  console.log(currentCardData);

  const getPointsElements = () => {
    return Array.from({ length: totalPoints }, (_, index) => (
      <div
        key={index}
        className="w-14 h-14 border-solid border-2 rounded-xl border-pink-500 flex items-center justify-center relative bg-pink-100/50"
      >
        <Text fontSize="xl" as="b" color="pink.700" opacity={0.6}>
          {index + 1}
        </Text>
        {currentPoints > index && (
          <div className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <img src="/images/point.webp" alt="point" className="clip-circle w-full object-cover -rotate-[30deg]" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Link to="/">
        <h1 className="text-5xl font-bold text-pink-400 mt-6">乖寶寶集點卡</h1>
      </Link>
      <section className="mt-12 w-full px-5">
        {!currentCardData ? (
          <div>
            <div className="font-bold mt-6 text-center text-lg">
              查無此集點卡，
              <Link to="/" className="underline">
                返回首頁
              </Link>
            </div>
          </div>
        ) : (
          <div
            className="border-solid border-4 border-pink-500 rounded-xl p-2 flex flex-col items-center "
            onClick={() => {
              if (currentPoints < totalPoints) {
                onOpen();
              }
            }}
          >
            <img src="/images/cardHeader.gif" className="w-full  object-cover" />
            <div className="grid grid-cols-5 gap-1">{getPointsElements()}</div>
            <AddPointModal
              isOpen={isOpen}
              onClose={onClose}
              handleAddPoint={handleAddPoint}
              currentCardData={currentCardData}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default RewardCard;
