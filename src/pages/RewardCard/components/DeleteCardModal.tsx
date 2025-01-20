import type { CardData } from '@type/common';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

interface DeleteCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const deleteCardListToLocalStorage = (cardId: string) => {
  const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
  const rewardCardList = JSON.parse(rewardCardListFromLocalStorage);

  const updatedRewardCardList = rewardCardList.filter((card: CardData) => card.id !== cardId);

  localStorage.setItem('rewardCardList', JSON.stringify(updatedRewardCardList));
};

const DeleteCardModal: React.FC<DeleteCardModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const { cardId = '' } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const handleDeleteCard = () => {
    deleteCardListToLocalStorage(cardId);
    onClose();
    navigate('/list');
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs" closeOnOverlayClick={false}>
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
