import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton } from '@chakra-ui/react';

const ActionButtons = () => {
  return (
    <Flex mb={2} justifyContent={'space-between'} gap={6}>
      <Button leftIcon={<StarIcon />} colorScheme="pink" flexGrow={1}>
        兌換獎勵
      </Button>
      <div>
        <IconButton colorScheme="blue" aria-label="Edit data" icon={<EditIcon />} mr={1} />
        <IconButton colorScheme="red" aria-label="Delete data" icon={<DeleteIcon />} />
      </div>
    </Flex>
  );
};

export default ActionButtons;
