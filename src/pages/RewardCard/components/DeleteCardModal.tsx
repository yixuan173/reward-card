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
import { useNavigate, useParams } from 'react-router-dom';

import type { BaseModalProps } from '@type/common';
import { deleteCardFromIndexedDB } from '@util/indexedDB';
import { showToast } from '@util/toast';
import { ALERT_STATUS } from '@constants/index';

const DeleteCardModal: React.FC<BaseModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const { cardId = '' } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteCardFromIndexedDB(cardId);
      showToast(toast, '刪除成功！！', ALERT_STATUS.SUCCESS);
      onClose();
      navigate('/list');
    } catch (error) {
      console.error(error);
      showToast(toast, '刪除失敗，請稍後再試。', ALERT_STATUS.ERROR);
    }
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
          <Button colorScheme="red" onClick={handleDelete}>
            刪除
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteCardModal;
