import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';

import ImageUpload from './ImageUpload';
import ImageLabel from './ImageLabel';
import { IMAGES_PATH, MODE } from '@constants/index';
import type { CardFormProps } from '@type/components/cardForm';
import type { CardData, ImageData, RedemptionData } from '@type/common';

const CARD_EXAMPLE_PATH = `${IMAGES_PATH}/card-example.webp`;
const CARD_HEADER_EXAMPLE_PATH = `${IMAGES_PATH}/cardHeader-example.webp`;
const POINT_EXAMPLE_PATH = `${IMAGES_PATH}/point-example.webp`;

const initialRedemptionData: RedemptionData = {
  id: '',
  content: '',
  points: 1,
};

/**
 * Checks if a value is a change event object.
 *
 * @param value A value of type `React.ChangeEvent<HTMLInputElement> | string | number | ImageData`.
 * @returns `true` if the value is a change event object, `false` otherwise.
 */
const isChangeEvent = (
  value: React.ChangeEvent<HTMLInputElement> | string | number | ImageData,
): value is React.ChangeEvent<HTMLInputElement> => {
  return typeof value === 'object' && 'target' in value;
};

const CardForm: React.FC<CardFormProps> = (props) => {
  const { cardData, setCardData, errors, setErrors, mode } = props;
  const [redemptionData, setRedemptionData] = useState<RedemptionData>(initialRedemptionData);
  const { title, totalPoints, redemptionList, cardHeaderImage, cardImage, pointImage } = cardData;
  const { content, points } = redemptionData;

  const validateRedemptionForm = (): boolean => {
    const newErrors: { [key in keyof RedemptionData]?: string } = {};

    if (!content.trim()) {
      newErrors.content = '請填寫兌換內容';
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return false;
    }

    return true;
  };

  const handleCreateRedemption = (): void => {
    if (!validateRedemptionForm()) return;

    const newRedemption = { ...redemptionData, id: crypto.randomUUID() };
    setCardData((prev) => ({
      ...prev,
      redemptionList: [...prev.redemptionList, newRedemption],
    }));
    setRedemptionData(initialRedemptionData);
  };

  const handleDeleteRedemption = (id: string): void => {
    setCardData((prev) => ({
      ...prev,
      redemptionList: prev.redemptionList?.filter((item) => item.id !== id),
    }));
  };

  const handleChange = <T,>(
    value: React.ChangeEvent<HTMLInputElement> | string | number | ImageData,
    key: keyof T,
    setState: React.Dispatch<React.SetStateAction<T>>,
  ): void => {
    setState((prev) => ({
      ...prev,
      [key]: isChangeEvent(value) ? value.target.value : value,
    }));
    setErrors({});
  };

  return (
    <>
      <FormControl isRequired isInvalid={!!errors.title}>
        <FormLabel>名稱：</FormLabel>
        <Input
          onChange={(e) => handleChange<CardData>(e, 'title', setCardData)}
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

      {mode === MODE.CREATE && (
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
              onChange={(e) => handleChange<CardData>(e, 'totalPoints', setCardData)}
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
              onChange={(e) => handleChange<CardData>(e, 'totalPoints', setCardData)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb fontSize="sm" boxSize="32px" children={totalPoints} />
            </Slider>
          </Flex>
        </FormControl>
      )}

      <FormControl mt={6}>
        <ImageLabel title="卡片列表縮圖" imgUrl={CARD_EXAMPLE_PATH} />
        <ImageUpload
          setImageData={(data: ImageData) => handleChange<CardData>(data, 'cardImage', setCardData)}
          image={cardImage}
        />
      </FormControl>

      <FormControl mt={6}>
        <ImageLabel title="卡片置頂縮圖" imgUrl={CARD_HEADER_EXAMPLE_PATH} />
        <ImageUpload
          setImageData={(data: ImageData) => handleChange<CardData>(data, 'cardHeaderImage', setCardData)}
          image={cardHeaderImage}
        />
      </FormControl>

      <FormControl mt={6}>
        <ImageLabel title="點數圖示" imgUrl={POINT_EXAMPLE_PATH} />
        <ImageUpload
          setImageData={(data: ImageData) => handleChange<CardData>(data, 'pointImage', setCardData)}
          image={pointImage}
        />
      </FormControl>

      <FormControl mt={6} isRequired={mode === MODE.CREATE} isInvalid={!!errors.content}>
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
    </>
  );
};

export default CardForm;
