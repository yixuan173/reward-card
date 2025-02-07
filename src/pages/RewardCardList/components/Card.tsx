import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Tag, TagLabel } from '@chakra-ui/react';

import getImageUrl from '@/util/getImageUrl';

interface CardProps {
  id: string;
  title: string;
  currentPoints: number;
  cardImage: File | null;
}

const Card: React.FC<CardProps> = (props) => {
  const { id, title, currentPoints, cardImage } = props;
  const [loading, setLoading] = useState(true);

  const onImgLoad = () => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <Link to={`/${id}`} key={id}>
      <div className="w-full relative flex flex-col items-center">
        <div className="relative">
          <div
            className={`absolute top-0 left-0 w-full h-64 bg-pink-200 animate-pulse ${loading ? 'block' : 'hidden'}`}
          />
          <Image
            src={getImageUrl(cardImage) || './images/card.webp'}
            alt={title}
            objectFit="cover"
            className={`w-full h-64 ${loading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={onImgLoad}
          />
        </div>
        <h2 className="text-2xl font-bold text-pink-600">{title}</h2>
        <Tag size="lg" colorScheme="red" borderRadius="full" className="absolute -top-3 -right-3">
          <TagLabel>{currentPoints}</TagLabel>
        </Tag>
      </div>
    </Link>
  );
};

export default Card;
