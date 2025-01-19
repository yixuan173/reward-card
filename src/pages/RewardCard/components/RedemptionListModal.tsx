import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';

interface RedemptionListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RedemptionListModal: React.FC<RedemptionListModalProps> = (props) => {
  const { isOpen, onClose } = props;

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs" closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>兌換獎勵</ModalHeader>

        <ModalBody></ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink">兌換</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RedemptionListModal;
