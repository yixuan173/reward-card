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

import type { CardData } from '@/types/common';
import type { CardFormData, CreateCardModalProps } from '@/types/pages/home';
import CardForm from '@components/Form/CardForm';

const initialCardFormData: CardFormData = {
  title: '',
  totalPoints: 10,
  redemptionList: [],
};

const CreateCardModal: React.FC<CreateCardModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const [cardFormData, setCardFormData] = useState<CardFormData>(initialCardFormData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { title, redemptionList } = cardFormData;

  const validateCardForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = '請填寫集點卡名稱';
    if (redemptionList.length === 0) newErrors.redemptionList = '請新增至少一項兌換清單';

    setErrors((prev) => ({ ...prev, ...newErrors }));

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateRewardCard = () => {
    if (!validateCardForm()) return;

    try {
      const newCard = {
        ...cardFormData,
        id: crypto.randomUUID(),
        createDate: new Date(),
        currentPoints: 0,
      } as CardData;

      const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
      localStorage.setItem('rewardCardList', JSON.stringify([...JSON.parse(rewardCardListFromLocalStorage), newCard]));

      setCardFormData(initialCardFormData);
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
        <ModalHeader>建立集點卡</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <CardForm
            mode="create"
            cardFormData={cardFormData}
            setCardFormData={setCardFormData}
            errors={errors}
            setErrors={setErrors}
          />
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink" onClick={handleCreateRewardCard}>
            建立
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
