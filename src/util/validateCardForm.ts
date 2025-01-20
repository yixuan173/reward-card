import type { CardData } from '@/types/common';

const validateCardForm = (
  cardData: CardData,
  setErrors: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>,
): boolean => {
  const { title, redemptionList } = cardData;
  const newErrors: { [key: string]: string } = {};

  if (!title.trim()) newErrors.title = '請填寫集點卡名稱';
  if (redemptionList.length === 0) newErrors.redemptionList = '請新增至少一項兌換清單';

  setErrors((prev) => ({ ...prev, ...newErrors }));

  return Object.keys(newErrors).length === 0;
};

export default validateCardForm;
