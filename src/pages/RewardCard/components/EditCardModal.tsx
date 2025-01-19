import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

interface EditCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>編輯</ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink">儲存</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCardModal;
