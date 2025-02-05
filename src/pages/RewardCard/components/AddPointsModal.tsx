import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

import type { CardModalProps } from '@type/pages/rewardCard';
import { updateCardToIndexedDB } from '@util/indexedDB';
import { showToast } from '@util/toast';
import { ALERT_STATUS } from '@constants/index';

const AddPointsModal: React.FC<CardModalProps> = (props) => {
  const { isOpen, onClose, setCurrentCardData, currentCardData } = props;
  const toast = useToast();
  const { totalPoints, currentPoints } = currentCardData;
  const [points, setPoints] = useState(1);

  const handleChange = (points: number | string) => {
    const numberPoints = typeof points === 'string' ? parseInt(points) : points;
    setPoints(numberPoints);
  };

  const handleAddPoints = async (points: number) => {
    try {
      const updateCard = {
        ...currentCardData,
        currentPoints: currentPoints + points,
      };

      await updateCardToIndexedDB(updateCard);
      setCurrentCardData(updateCard);
      onClose();
    } catch (error) {
      console.error(error);
      showToast(toast, '新增點數失敗，請稍後再試。', ALERT_STATUS.ERROR);
    }
  };

  return (
    <Modal onClose={onClose} size="xs" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新增</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={4}>
            請輸入要增加的點數
            <NumberInput min={1} max={totalPoints - currentPoints} maxW="100px" value={points} onChange={handleChange}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Slider
              min={1}
              max={totalPoints - currentPoints}
              width="95%"
              flex="1"
              focusThumbOnChange={false}
              value={points}
              onChange={handleChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={points} />
            </Slider>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button
            colorScheme="pink"
            onClick={() => {
              handleAddPoints(points);
              setPoints(1);
            }}
          >
            蓋章
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPointsModal;
