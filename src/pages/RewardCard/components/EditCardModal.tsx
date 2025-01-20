import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import CardForm from '@components/Form/CardForm';
import type { CardData } from '@/types/common';
import validateCardForm from '@util/validateCardForm';
import { WarningTwoIcon } from '@chakra-ui/icons';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

const EditCardModal: React.FC<EditCardModalProps> = (props) => {
  const { isOpen, onClose, currentCardData, setCurrentCardData } = props;
  const toast = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSaveRewardCard = () => {
    if (!validateCardForm(currentCardData, setErrors)) return;

    try {
      const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
      const rewardCardList = JSON.parse(rewardCardListFromLocalStorage) as CardData[];
      const updatedRewardCardList = rewardCardList.map((card: CardData) => {
        if (card.id === currentCardData.id) {
          return currentCardData;
        }
        return card;
      });

      localStorage.setItem('rewardCardList', JSON.stringify(updatedRewardCardList));

      toast({
        title: '更新成功！！',
        position: 'top',
        status: 'success',
        duration: 2500,
        containerStyle: {
          marginTop: '2rem',
        },
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast({
        title: '更新失敗，請稍後再試。',
        position: 'top',
        status: 'error',
        duration: 2500,
        containerStyle: {
          marginTop: '2rem',
        },
        icon: <WarningTwoIcon mt="5px" />,
      });
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>編輯</ModalHeader>

        <ModalBody>
          <CardForm
            mode="edit"
            cardData={currentCardData}
            setCardData={setCurrentCardData}
            errors={errors}
            setErrors={setErrors}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink" onClick={handleSaveRewardCard}>
            儲存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCardModal;
