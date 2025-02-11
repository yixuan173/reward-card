import { MODE } from '@constants/index';
import type { ImageData, CardData, Error } from '@type/common';

export interface CardFormProps {
  mode: (typeof MODE)[keyof typeof MODE];
  cardData: CardData;
  setCardData: React.Dispatch<React.SetStateAction<CardData>>;
  errors: Error;
  setErrors: React.Dispatch<React.SetStateAction<Error>>;
}

export interface ImageLabelProps {
  title: string;
  imgUrl: string;
}

export interface ImageUploadProps {
  setImageData: (data: ImageData) => void;
  image: ImageData;
}
