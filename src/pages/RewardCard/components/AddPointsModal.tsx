import type { CardData } from '@type/common';
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
} from '@chakra-ui/react';
import { useState } from 'react';

import updateCardListToLocalStorage from '@util/updateCardListToLocalStorage';
import { useParams } from 'react-router-dom';

interface AddPointsModalProps {
  isOpen: boolean;
  currentCardData: CardData;
  onClose: () => void;
  setCurrentCardData: React.Dispatch<React.SetStateAction<CardData>>;
}

const AddPointsModal: React.FC<AddPointsModalProps> = (props) => {
  const { isOpen, onClose, setCurrentCardData, currentCardData } = props;
  const { cardId = '' } = useParams<{ cardId: string }>();
  const { totalPoints, currentPoints } = currentCardData;
  const [points, setPoints] = useState(1);

  const handleChange = (points: number | string) => {
    const numberPoints = typeof points === 'string' ? parseInt(points) : points;
    setPoints(numberPoints);
  };

  const handleAddPoints = (points: number) => {
    setCurrentCardData((prev) => ({ ...prev, currentPoints: prev.currentPoints + points }));
    updateCardListToLocalStorage(cardId, points);

    onClose();
  };

  return (
    <Modal onClose={onClose} size="xs" isOpen={isOpen} isCentered closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新增點數</ModalHeader>
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
