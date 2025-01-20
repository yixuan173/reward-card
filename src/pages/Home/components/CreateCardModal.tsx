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

import type { CardData, BaseModalProps } from '@type/common';
import CardForm from '@components/CardForm';
import validateCardForm from '@util/validateCardForm';
import { getItemFromLocalStorage, setItemToLocalStorage } from '@util/localStorage';
import { LOCAL_STORAGE_KEYS } from '@constants/index';

const initialCardData: CardData = {
  id: '',
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

  const handleCreateRewardCard = () => {
    if (!validateCardForm(cardData, setErrors)) return;

    try {
      const newCard = {
        ...cardData,
        id: crypto.randomUUID(),
        currentPoints: 0,
      } as CardData;

      const rewardCardList = getItemFromLocalStorage(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST) as CardData[];
      setItemToLocalStorage<CardData[]>(LOCAL_STORAGE_KEYS.REWARD_CARD_LIST, [...rewardCardList, newCard]);

      setCardData(initialCardData);
      onClose();
      toast({
        title: '集點卡新增成功！！',
        position: 'top',
        status: 'success',
        duration: 2500,
        containerStyle: {
          marginTop: '2rem',
        },
      });
    } catch (error) {
      console.error(error);
      toast({
        title: '集點卡新增失敗，請稍後再試。',
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
          <Button colorScheme="pink" onClick={handleCreateRewardCard}>
            新增
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
