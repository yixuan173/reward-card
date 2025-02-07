import { AddIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';
import React from 'react';

import getImageUrl from '@util/getImageUrl';

interface ImageUploadProps {
  setImageData: (file: File) => void;
  image: File | null;
}
const ImageUpload: React.FC<ImageUploadProps> = (props) => {
  const { setImageData, image } = props;
  const imageUrl = getImageUrl(image);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setImageData(selectedFile);
    }
  };

  return (
    <div className="w-full h-[150px] relative flex justify-center items-center border-2 border-dashed">
      {imageUrl ? (
        <Image src={imageUrl} className="w-full h-full object-contain" />
      ) : (
        <div className="flex flex-col items-center gap-2 text-gray-600">
          <AddIcon boxSize={10} />
          <span className="font-bold text-gray-400">Drag image here or click to upload</span>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0"
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUpload;
