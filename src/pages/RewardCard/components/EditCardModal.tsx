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
import { WarningTwoIcon } from '@chakra-ui/icons';

import CardForm from '@components/CardForm';
import type { CardData } from '@type/common';
import type { CardModalProps } from '@type/pages/rewardCard';
import validateCardForm from '@util/validateCardForm';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@util/localStorage';
import { ALERT_STATUS, LOCAL_STORAGE_KEYS } from '@constants/index';
import { showToast } from '@util/toast';

const EditCardModal: React.FC<CardModalProps> = (props) => {
  const { isOpen, onClose, currentCardData, setCurrentCardData } = props;
  const toast = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSaveRewardCard = () => {
    if (!validateCardForm(currentCardData, setErrors)) return;

    try {
      const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST) as CardData[];
      const updatedRewardCardList = rewardCardList.map((card: CardData) => {
        if (card.id === currentCardData.id) {
          return currentCardData;
        }
        return card;
      });

      setItemToLocalStorage<CardData[]>(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST, updatedRewardCardList);

      showToast(toast, '更新成功！！', ALERT_STATUS.SUCCESS);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(toast, '更新失敗，請稍後再試。', ALERT_STATUS.ERROR, <WarningTwoIcon mt="5px" />);
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
