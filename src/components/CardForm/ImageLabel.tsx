import { InfoIcon } from '@chakra-ui/icons';
import { FormLabel, IconButton, Tooltip } from '@chakra-ui/react';
import React from 'react';

interface ImageLabelProps {
  title: string;
  imgUrl: string;
}

const ImageLabel: React.FC<ImageLabelProps> = (props) => {
  const { title, imgUrl } = props;

  return (
    <FormLabel className="flex items-center">
      <Tooltip hasArrow label={<img src={imgUrl} />} bg="gray.300">
        <IconButton
          aria-label="Image-Info"
          size="sm"
          colorScheme="white"
          color="gray.600"
          className="-ml-1 -mr-1 mb-[2px]"
          icon={<InfoIcon />}
        />
      </Tooltip>
      {title}：
    </FormLabel>
  );
};

export default ImageLabel;
