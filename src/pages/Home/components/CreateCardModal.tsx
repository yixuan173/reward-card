import { DeleteIcon, WarningTwoIcon } from '@chakra-ui/icons';
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
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

interface CreateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RedemptionData {
  id: string;
  content: string;
  points: number;
}
interface CardData {
  id: string;
  title: string;
  totalPoints: number;
  currentPoints: number;
  redemptionList: RedemptionData[];
  createDate: Date;
}

type CardFormData = Omit<CardData, 'id' | 'createDate' | 'currentPoints'>;

const initialCardFormData: CardFormData = {
  title: '',
  totalPoints: 10,
  redemptionList: [],
};

const initialRedemptionData: RedemptionData = {
  id: '',
  content: '',
  points: 1,
};

const CreateCardModal: React.FC<CreateCardModalProps> = (props) => {
  const { isOpen, onClose } = props;
  const toast = useToast();
  const [cardFormData, setCardFormData] = useState<CardFormData>(initialCardFormData);
  const [redemptionData, setRedemptionData] = useState<RedemptionData>(initialRedemptionData);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { title, totalPoints, redemptionList } = cardFormData;
  const { content, points } = redemptionData;

  const isChangeEvent = (
    e: React.ChangeEvent<HTMLInputElement> | string | number,
  ): e is React.ChangeEvent<HTMLInputElement> => {
    return typeof e === 'object' && 'target' in e;
  };

  const handleChange = <T,>(
    e: React.ChangeEvent<HTMLInputElement> | string | number,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>,
  ): void => {
    setState((prev) => ({
      ...prev,
      [key]: isChangeEvent(e) ? e.target.value : e,
    }));
    setErrors({});
  };

  const validateRedemptionForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!content.trim()) newErrors.content = '請填寫兌換內容';

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleCreateRedemption = () => {
    if (!validateRedemptionForm()) return;

    const newRedemption = { ...redemptionData, id: crypto.randomUUID() };
    setCardFormData((prev) => ({
      ...prev,
      redemptionList: [...prev.redemptionList, newRedemption],
    }));
    setRedemptionData(initialRedemptionData);
  };

  const handleDeleteRedemption = (id: string) => {
    setCardFormData((prev) => ({
      ...prev,
      redemptionList: prev.redemptionList?.filter((item) => item.id !== id),
    }));
  };

  const validateCardForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!title.trim()) newErrors.title = '請填寫集點卡名稱';
    if (redemptionList.length === 0) newErrors.redemptionList = '請新增至少一項兌換清單';

    setErrors(newErrors);

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

      const rewardCardList = localStorage.getItem('rewardCardList') || '[]';
      localStorage.setItem('rewardCardList', JSON.stringify([...JSON.parse(rewardCardList), newCard]));

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
          <FormControl isRequired isInvalid={!!errors.title}>
            <FormLabel>名稱：</FormLabel>
            <Input
              onChange={(e) => handleChange<CardFormData>(e, 'title', setCardFormData)}
              name="title"
              value={title}
              placeholder="請輸入集點卡名稱"
            />
            {errors.title && (
              <FormHelperText color="red.500" mt={0}>
                {errors.title}
              </FormHelperText>
            )}
          </FormControl>

          <FormControl mt={6} isRequired>
            <FormLabel>總點數：</FormLabel>
            <Flex>
              <NumberInput
                max={100}
                min={10}
                precision={0}
                width="30%"
                mr="1rem"
                value={totalPoints}
                name="totalPoints"
                onChange={(e) => handleChange<CardFormData>(e, 'totalPoints', setCardFormData)}
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
                min={10}
                mr={2}
                value={totalPoints}
                onChange={(e) => handleChange<CardFormData>(e, 'totalPoints', setCardFormData)}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb fontSize="sm" boxSize="32px" children={totalPoints} />
              </Slider>
            </Flex>
          </FormControl>

          <FormControl mt={6} isRequired isInvalid={!!errors.content}>
            <FormLabel>兌換清單：</FormLabel>
            <Input
              placeholder="請輸入兌換內容"
              name="content"
              value={content}
              onChange={(e) => handleChange<RedemptionData>(e, 'content', setRedemptionData)}
            />
            {errors.content && (
              <FormHelperText color="red.500" mt={0}>
                {errors.content}
              </FormHelperText>
            )}
            <Flex justify="space-between" align="end">
              <Flex align="end" gap={1}>
                <NumberInput
                  isInvalid={false}
                  mt={2}
                  max={totalPoints}
                  min={1}
                  precision={0}
                  width="40%"
                  name="points"
                  value={points}
                  onChange={(e) => handleChange<RedemptionData>(e, 'points', setRedemptionData)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                {'點'}
              </Flex>
              <Button colorScheme="pink" size="sm" variant={'outline'} onClick={handleCreateRedemption}>
                + 新增
              </Button>
            </Flex>
            <FormHelperText mt={0}>請填寫兌換項目時，需扣除的點數 (勿超過總點數)</FormHelperText>

            {redemptionList.length > 0 ? (
              <TableContainer mt={3}>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>內容</Th>
                      <Th isNumeric>點數</Th>
                      <Th />
                    </Tr>
                  </Thead>
                  <Tbody>
                    {redemptionList.map(({ id, content, points }) => (
                      <Tr key={id}>
                        <Td>{content}</Td>
                        <Td isNumeric>{points}</Td>
                        <Td width="10%" p={0}>
                          <IconButton
                            aria-label="Delete item"
                            size="sm"
                            icon={<DeleteIcon />}
                            onClick={() => handleDeleteRedemption(id)}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : errors.redemptionList ? (
              <div className="font-bold mt-6 text-center text-lg text-red-500">{errors.redemptionList}</div>
            ) : (
              <div className="font-bold mt-6 text-center underline text-lg">尚未新增兌換清單</div>
            )}
          </FormControl>
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
