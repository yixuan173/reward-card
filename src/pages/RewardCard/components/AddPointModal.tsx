import { CardData } from '@/types/common';
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

interface AddPointModalProps {
  isOpen: boolean;
  currentCardData: CardData;
  onClose: () => void;
  handleAddPoint: (point: number) => void;
}

const AddPointModal: React.FC<AddPointModalProps> = (props) => {
  const { isOpen, onClose, handleAddPoint, currentCardData } = props;
  const { totalPoints, currentPoints } = currentCardData;
  const [earnPoint, setEarnPoint] = useState(1);

  const handleChange = (point: number | string) => {
    const numberPoint = typeof point === 'string' ? parseInt(point) : point;
    setEarnPoint(numberPoint);
  };

  return (
    <Modal onClose={onClose} size="xs" isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>新增點數</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex direction="column" gap={4}>
            請輸入要增加的點數
            <NumberInput
              min={1}
              max={totalPoints - currentPoints}
              maxW="100px"
              value={earnPoint}
              onChange={handleChange}
            >
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
              value={earnPoint}
              onChange={handleChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={earnPoint} />
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
              handleAddPoint(earnPoint);
              setEarnPoint(1);
            }}
          >
            蓋章
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPointModal;
