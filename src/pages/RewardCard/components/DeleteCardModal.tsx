import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import type { BaseModalProps, CardData } from '@type/common';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@util/localStorage';
import { LOCAL_STORAGE_KEYS } from '@constants/index';

const deleteCardListToLocalStorage = (cardId: string) => {
  const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST) as CardData[];

  const updatedRewardCardList = rewardCardList.filter((card: CardData) => card.id !== cardId);

  setItemToLocalStorage<CardData[]>(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST, updatedRewardCardList);
};

const DeleteCardModal: React.FC<BaseModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const { cardId = '' } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const handleDeleteCard = () => {
    deleteCardListToLocalStorage(cardId);
    onClose();
    navigate('/list');
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>刪除</ModalHeader>

        <ModalBody>是否要刪除集點卡？</ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="red" onClick={handleDeleteCard}>
            刪除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCardModal;
