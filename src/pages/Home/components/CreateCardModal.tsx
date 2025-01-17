import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Flex,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  FormHelperText,
} from '@chakra-ui/react';
import { useState } from 'react';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RedemptionData {
  id: string | null;
  content: string;
  count: number;
}
interface CardData {
  id: string;
  title: string;
  totalCount: number;
  redemptionList: RedemptionData[];
  createDate: Date;
}

type CardFormData = Omit<CardData, 'id' | 'createDate'>;

const initialCardFormData: CardFormData = {
  title: '',
  totalCount: 0,
  redemptionList: [],
};

const initialRedemptionData: RedemptionData = {
  id: null,
  content: '',
  count: 0,
};

const CreateCardModal: React.FC<CreateCardModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const [cardFormData, setCardFormData] = useState<CardFormData>(initialCardFormData);
  const [redemptionData, setRedemptionData] = useState<RedemptionData>(initialRedemptionData);
  const { title, totalCount, redemptionList } = cardFormData;
  const { content, count } = redemptionData;

  const isChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement> | string | number,
  ): e is React.ChangeEvent<HTMLInputElement> => {
    return typeof e === 'object' && 'target' in e;
  };

  const handleChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement> | string | number,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>,
  ): void =>
    setState((prev) => ({
      ...prev,
      [key]: isChangeEvent(e) ? e.target.value : e,
    }));

  const handleCreateRedemption = () => {
    const newRedemption = { ...redemptionData, id: crypto.randomUUID() };
    setCardFormData((prev) => ({
      ...prev,
      redemptionList: [...prev.redemptionList, newRedemption],
    }));
    setRedemptionData(initialRedemptionData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} isCentered scrollBehavior="inside" size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>建立集點卡</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>名稱：</FormLabel>
            <Input
              onChange={(e) => handleChange<CardFormData>(e, 'title', setCardFormData)}
              name="title"
              value={title}
              placeholder="請輸入集點卡名稱"
            />
          </FormControl>

          <FormControl mt={8} isRequired>
            <FormLabel>總格子數：</FormLabel>
            <Flex>
              <NumberInput
                max={100}
                min={10}
                maxW="100px"
                mr="2rem"
                value={totalCount}
                name="totalCount"
                onChange={(e) => handleChange<CardFormData>(e, 'totalCount', setCardFormData)}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <Slider
                flex="1"
                focusThumbOnChange={false}
                value={totalCount}
                onChange={(e) => handleChange<CardFormData>(e, 'totalCount', setCardFormData)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={totalCount} />
              </Slider>
            </Flex>
          </FormControl>

          <FormControl mt={8} isRequired>
            <FormLabel>兌換清單：</FormLabel>
            <Input
              placeholder="請輸入兌換內容"
              name="content"
              value={content}
              onChange={(e) => handleChange<RedemptionData>(e, 'content', setRedemptionData)}
            />
            <Flex justify="space-between" align="end">
              <Input
                mt={2}
                width="50%"
                placeholder="請輸入點數"
                type="number"
                name="count"
                value={count}
                onChange={(e) => handleChange<RedemptionData>(e, 'count', setRedemptionData)}
              />
              <Button colorScheme="pink" size="sm" variant={'outline'} onClick={handleCreateRedemption}>
                + 新增
              </Button>
            </Flex>
            <FormHelperText mt={0}>用於兌換項目時，所需扣除的點數</FormHelperText>
            {redemptionList.length > 0 ? (
              <TableContainer mt={3}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>內容</Th>
                      <Th isNumeric>點數</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {redemptionList.map(({ id, content, count }) => (
                      <Tr key={id}>
                        <Td>{content}</Td>
                        <Td isNumeric>{count}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <div className="font-bold mt-6 text-center underline text-lg">尚未新增兌換清單</div>
            )}
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="pink">建立</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateCardModal;
