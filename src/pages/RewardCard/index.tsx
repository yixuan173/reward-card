import { Image, Text, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import type { CardData } from '@type/common';
import AddPointsModal from './components/AddPointsModal';
import ActionButtons from './components/ActionButtons';
import Header from '@components/Header';
import { getCardFromIndexedDB } from '@util/indexedDB';
import getImageUrl from '@util/getImageUrl';

const RewardCard = () => {
  const { cardId = '' } = useParams<{ cardId: string }>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentCardData, setCurrentCardData] = useState<CardData | null>(null);
  const { totalPoints = 0, currentPoints = 0, pointImage = null, cardHeaderImage = null } = currentCardData || {};
  const pointImageUrl = getImageUrl(pointImage);
  const cardHeaderImageUrl = getImageUrl(cardHeaderImage);

  const getCardData = async (cardId: string) => {
    const card = await getCardFromIndexedDB(cardId);
    setCurrentCardData(card);
  };

  useEffect(() => {
    getCardData(cardId);
  }, [cardId]);

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
          <div className="w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex">
            <Image
              src={pointImageUrl}
              fallbackSrc="./images/point.webp"
              alt="point"
              borderRadius="full"
              objectFit="cover"
              className="-rotate-[30deg]"
            />
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
                src={cardHeaderImageUrl}
                fallbackSrc="./images/cardHeader.gif"
                alt="card-header-picture"
                objectFit="cover"
                className="w-full max-h-[200px]"
              />
              <div className="grid grid-cols-5 gap-1 mt-3">{getPointElements()}</div>
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
