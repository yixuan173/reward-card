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

import { CardModalProps } from '@type/pages/rewardCard';
import { showToast } from '@util/toast';
import { ALERT_STATUS } from '@constants/index';
import { updateCardToIndexedDB } from '@util/indexedDB';

const RedemptionListModal: React.FC<CardModalProps> = (props) => {
  const { isOpen, onClose, currentCardData, setCurrentCardData } = props;
  const toast = useToast();
  const { redemptionList, currentPoints } = currentCardData;
  const sortedRedemptionList = redemptionList.sort((a, b) => a.points - b.points);

  const handleRedeem = async (points: number) => {
    if (currentPoints < points) return;
    try {
      const updateCard = {
        ...currentCardData,
        currentPoints: currentPoints - points,
      };

      await updateCardToIndexedDB(updateCard);
      setCurrentCardData(updateCard);
      showToast(toast, '兌換成功！！', ALERT_STATUS.SUCCESS);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(toast, '兌換失敗，請稍後再試。', ALERT_STATUS.ERROR);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered size="xs">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>兌換</ModalHeader>
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
