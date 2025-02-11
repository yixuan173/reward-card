import { InfoIcon } from '@chakra-ui/icons';
import {
  FormLabel,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';

import type { ImageLabelProps } from '@type/components/cardForm';

const ImageLabel: React.FC<ImageLabelProps> = (props) => {
  const { title, imgUrl } = props;

  return (
    <FormLabel className="flex items-center">
      <Popover>
        <PopoverTrigger>
          <IconButton
            aria-label="Image-Info"
            size="sm"
            colorScheme="white"
            color="pink.300"
            className="-ml-1 -mr-1 mb-[2px]"
            icon={<InfoIcon />}
          />
        </PopoverTrigger>
        <PopoverContent color="white" bg="gray.100" borderColor="gray.100">
          <PopoverHeader pt={2} fontWeight="bold" border="0" color="black">
            示意圖：
          </PopoverHeader>
          <PopoverArrow bg="gray.100" />
          <PopoverBody>
            <img src={imgUrl} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {title}：
    </FormLabel>
  );
};

export default ImageLabel;
