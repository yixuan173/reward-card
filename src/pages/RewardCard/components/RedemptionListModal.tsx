import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import type { CardData } from '@/types/common';
import updateCardListToLocalStorage from '@util/updateCardListToLocalStorage';
interface RedemptionListModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentCardData: CardData;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

const RedemptionListModal: React.FC<RedemptionListModalProps> = (props) => {
  const { isOpen, onClose, currentCardData, setCurrentCardData } = props;
  const toast = useToast();
  const { cardId = '' } = useParams<{ cardId: string }>();
  const { redemptionList, currentPoints } = currentCardData;
  const sortedRedemptionList = redemptionList.sort((a, b) => b.points - a.points);

  const handleRedeem = (points: number) => {
    if (currentPoints >= points) {
      setCurrentCardData((prev) => ({ ...prev, currentPoints: prev.currentPoints - points }));
      updateCardListToLocalStorage(cardId, -points);
      toast({
        title: '兌換獎勵成功！！',
        position: 'top',
        status: 'success',
        duration: 2500,
        containerStyle: {
          marginTop: '2rem',
        },
      });
      onClose();

      return;
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>兌換獎勵</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <TableContainer mb={8}>
            <Table>
              <Thead>
                <Tr>
                  <Th>獎勵</Th>
                  <Th isNumeric>消耗點數</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {sortedRedemptionList.map(({ id, content, points }) => (
                  <Tr key={id}>
                    <Td>{content}</Td>
                    <Td isNumeric>{points}</Td>
                    <Td width="10%" p={0}>
                      <Button
                        colorScheme="pink"
                        size="xs"
                        onClick={() => handleRedeem(points)}
                        isDisabled={currentPoints < points}
                      >
                        兌換
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RedemptionListModal;
