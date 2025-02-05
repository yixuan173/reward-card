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
import { ALERT_STATUS } from '@constants/index';
import { showToast } from '@util/toast';
import { updateCardToIndexedDB } from '@util/indexedDB';

const EditCardModal: React.FC<CardModalProps> = (props) => {
  const { isOpen, onClose, currentCardData, setCurrentCardData } = props;
  const toast = useToast();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSaveRewardCard = async () => {
    if (!validateCardForm(currentCardData, setErrors)) return;

    try {
      await updateCardToIndexedDB(currentCardData);
      showToast(toast, '更新成功！！', ALERT_STATUS.SUCCESS);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(toast, '更新失敗，請稍後再試。', ALERT_STATUS.ERROR, <WarningTwoIcon mt="5px" />);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="sm" scrollBehavior="inside" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>編輯</ModalHeader>

        <ModalBody>
          <CardForm
            mode="edit"
            cardData={currentCardData}
            setCardData={setCurrentCardData as React.Dispatch<React.SetStateAction<CardData>>}
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
