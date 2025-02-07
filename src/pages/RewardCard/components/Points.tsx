import React, { useState } from 'react';
import { Image, Text } from '@chakra-ui/react';

interface PointsProps {
  totalPoints: number;
  currentPoints: number;
  pointImageUrl: string;
}
const Points: React.FC<PointsProps> = (props) => {
  const { totalPoints, currentPoints, pointImageUrl } = props;
  const [loading, setLoading] = useState(true);

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
            src={pointImageUrl || './images/point.webp'}
            alt="point"
            borderRadius="full"
            className={`-rotate-[30deg] w-full ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={onImgLoad}
          />
        </div>
      )}
    </div>
  ));
};

export default Points;
