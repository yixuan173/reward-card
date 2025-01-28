import type { CardData } from '@type/common';
import { Image, Text, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import AddPointsModal from './components/AddPointsModal';
import ActionButtons from './components/ActionButtons';
import { getItemFromLocalStorage } from '@util/localStorage';
import { LOCAL_STORAGE_KEYS } from '@constants/index';
import Header from '@components/Header';

const getInitialCardData = (cardId: string) => {
  const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST);
  return rewardCardList.find((card: CardData) => card.id === cardId);
};

const RewardCard = () => {
  const { cardId = '' } = useParams<{ cardId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCardData, setCurrentCardData] = useState<CardData>(getInitialCardData(cardId));
  const { totalPoints, currentPoints } = currentCardData || {};

  const getPointElements = () => {
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
            <Image src="" fallbackSrc="./images/point.webp" alt="point" borderRadius="full" objectFit="cover" />
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <Header />
      <section className="mt-12 w-full px-5 pb-8 max-w-lg">
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
          <>
            <ActionButtons currentCardData={currentCardData} setCurrentCardData={setCurrentCardData} />
            <div
              className="border-solid border-4 border-pink-500 rounded-xl p-2 flex flex-col items-center "
              onClick={() => {
                if (currentPoints < totalPoints) {
                  onOpen();
                }
              }}
            >
              <Image
                src=""
                fallbackSrc="./images/cardHeader.gif"
                alt="card-header-picture"
                objectFit="cover"
                boxSize="100%"
              />
              <div className="grid grid-cols-5 gap-1">{getPointElements()}</div>
              <AddPointsModal
                isOpen={isOpen}
                onClose={onClose}
                setCurrentCardData={setCurrentCardData}
                currentCardData={currentCardData}
              />
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default RewardCard;
