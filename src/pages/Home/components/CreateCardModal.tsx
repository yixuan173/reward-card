import { WarningTwoIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { CardData, BaseModalProps, ImageData } from '@type/common';
import CardForm from '@components/CardForm';
import validateCardForm from '@util/validateCardForm';
import { ALERT_STATUS } from '@constants/index';
import { showToast } from '@util/toast';
import { addCardToIndexedDB } from '@util/indexedDB';

const initialImageData: ImageData = {
  buffer: null,
  type: '',
};

const initialCardData: CardData = {
  id: '',
  cardHeaderImage: initialImageData,
  pointImage: initialImageData,
  cardImage: initialImageData,
  currentPoints: 0,
  title: '',
  totalPoints: 10,
  redemptionList: [],
};

const CreateCardModal: React.FC<BaseModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const [cardData, setCardData] = useState<CardData>(initialCardData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleCreate = async () => {
    if (!validateCardForm(cardData, setErrors)) return;

    try {
      const newCard = {
        ...cardData,
        id: crypto.randomUUID(),
      } as CardData;

      await addCardToIndexedDB(newCard);
      setCardData(initialCardData);
      showToast(toast, '集點卡新增成功！！', ALERT_STATUS.SUCCESS);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(toast, '集點卡新增失敗，請稍後再試。', ALERT_STATUS.ERROR, <WarningTwoIcon mt="5px" />);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered scrollBehavior="inside" size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新增</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <CardForm mode="create" cardData={cardData} setCardData={setCardData} errors={errors} setErrors={setErrors} />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink" onClick={handleCreate}>
            新增
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
