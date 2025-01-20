import { DeleteIcon, EditIcon, StarIcon } from '@chakra-ui/icons';
import { Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react';

import DeleteCardModal from './DeleteCardModal';
import EditCardModal from './EditCardModal';
import RedemptionListModal from './RedemptionListModal';
import type { ActionButtonsProps } from '@type/pages/rewardCard';

const ActionButtons: React.FC<ActionButtonsProps> = (props) => {
  const { currentCardData, setCurrentCardData } = props;
  const { isOpen: isOpenDeleteModal, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const { isOpen: isOpenEditModal, onOpen: onOpenEditModal, onClose: onCloseEditModal } = useDisclosure();
  const {
    isOpen: isOpenRedemptionListModal,
    onOpen: onOpenRedemptionListModal,
    onClose: onCloseRedemptionListModal,
  } = useDisclosure();

  return (
    <>
      <Flex mb={2} justifyContent={'space-between'} gap={6}>
        <Button leftIcon={<StarIcon />} colorScheme="pink" flexGrow={1} onClick={() => onOpenRedemptionListModal()}>
          兌換獎勵
        </Button>
        <div>
          <IconButton
            colorScheme="blue"
            aria-label="Edit data"
            icon={<EditIcon />}
            mr={1}
            onClick={() => onOpenEditModal()}
          />
          <IconButton
            colorScheme="red"
            aria-label="Delete data"
            icon={<DeleteIcon />}
            onClick={() => onOpenDeleteModal()}
          />
        </div>
      </Flex>
      <DeleteCardModal isOpen={isOpenDeleteModal} onClose={onCloseDeleteModal} />
      <EditCardModal
        isOpen={isOpenEditModal}
        onClose={onCloseEditModal}
        currentCardData={currentCardData}
        setCurrentCardData={setCurrentCardData}
      />
      <RedemptionListModal
        isOpen={isOpenRedemptionListModal}
        onClose={onCloseRedemptionListModal}
        currentCardData={currentCardData}
        setCurrentCardData={setCurrentCardData}
      />
    </>
  );
};

export default ActionButtons;
