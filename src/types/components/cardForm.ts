import { MODE } from '@constants/index';
import type { ImageData, CardData } from '@type/common';

export interface CardFormProps {
  mode: (typeof MODE)[keyof typeof MODE];
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  errors: { [key: string]: string };
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

export interface ImageLabelProps {
  title: string;
  imgUrl: string;
}

export interface ImageUploadProps {
  setImageData: (data: ImageData) => void;
  image: ImageData;
}
