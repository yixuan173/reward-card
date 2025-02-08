import React, { useState } from 'react';
import { Image, Text } from '@chakra-ui/react';
import { IMAGES_PATH } from '@constants/index';
import type { ImageData } from '@type/common';
import getImageUrl from '@util/getImageUrl';

interface PointsProps {
  totalPoints: number;
  currentPoints: number;
  pointImage: ImageData | null;
}

const DEFAULT_POINT_PATH = `${IMAGES_PATH}/point.webp`;
const Points: React.FC<PointsProps> = (props) => {
  const { totalPoints, currentPoints, pointImage } = props;
  const [loading, setLoading] = useState(true);
  const pointImageUrl = getImageUrl(pointImage, DEFAULT_POINT_PATH);

  const onImgLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return Array.from({ length: totalPoints }, (_, index) => (
    <div
      key={index}
      className="w-14 h-14 border-solid border-2 rounded-xl border-pink-500 flex items-center justify-center relative bg-pink-100/50"
    >
      <Text fontSize="xl" as="b" color="pink.700" opacity={0.6}>
        {index + 1}
      </Text>
      {currentPoints > index && (
        <div
          className={`w-16 h-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex clip-circle ${loading ? 'bg-white/80' : ''} `}
        >
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-[30deg] w-16 h-16  bg-pink-200 animate-pulse ${loading ? 'block' : 'hidden'}`}
          />
          <Image
            src={pointImageUrl}
            alt="point"
            borderRadius="full"
            objectFit="cover"
            className={`-rotate-[30deg] w-full ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={onImgLoad}
          />
        </div>
      )}
    </div>
  ));
};

export default Points;
