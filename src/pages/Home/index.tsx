import { Button, Stack, useDisclosure, useToast, Box, Link, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import CreateCardModal from './components/CreateCardModal';
import { ALERT_STATUS, IMAGES_PATH, MAX_CARD_COUNT } from '@constants/index';
import { showToast } from '@util/toast';
import { getCardListFromIndexedDB } from '@/util/indexedDB';

const GITHUB_LINK = 'https://github.com/yixuan173/reward-card';
const GITHUB_LOGO_PATH = `${IMAGES_PATH}/logo-github.svg`;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const checkIsExceedCardMaxCount = async () => {
    const rewardCardList = await getCardListFromIndexedDB();
    if (rewardCardList.length >= MAX_CARD_COUNT) return true;
    return false;
  };

  const handleCreateCard = async () => {
    const isExceedCardMaxCount = await checkIsExceedCardMaxCount();
    if (isExceedCardMaxCount) {
      showToast(toast, `已達最大集點卡數量(${MAX_CARD_COUNT}張)，無法繼續新增。`, ALERT_STATUS.WARNING);
      return;
    }
    onOpen();
  };

  const handleViewRewardCardList = async () => {
    const rewardCardList = await getCardListFromIndexedDB();
    if (rewardCardList.length > 0) {
      navigate('/list');
    } else {
      showToast(toast, '請先新增集點卡！！！', ALERT_STATUS.INFO);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-14 m-auto">
        <h1 className="text-5xl font-bold text-pink-400">乖寶寶集點卡</h1>
        <section>
          <Stack spacing="20px">
            <Button colorScheme="pink" size="lg" onClick={handleCreateCard}>
              新增集點卡
            </Button>
            <Button colorScheme="pink" size="lg" variant="outline" onClick={handleViewRewardCardList}>
              查看集點卡
            </Button>
          </Stack>
        </section>
        <CreateCardModal isOpen={isOpen} onClose={onClose} />
      </div>
      <Box as="footer" py="4" textAlign="center" className="flex justify-center items-center">
        <span>2025</span>
        <Link href={GITHUB_LINK} isExternal ml="2">
          <Image src={GITHUB_LOGO_PATH} boxSize="24px" alt="GitHub Logo" />
        </Link>
      </Box>
    </div>
  );
};

export default Home;
