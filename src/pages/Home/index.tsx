import { Button, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

import CreateCardModal from './components/CreateCardModal';

const MAX_CARD_COUNT = 6;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const rewardCardListFromLocalStorage = localStorage.getItem('rewardCardList') || '[]';
  const rewardCardList = JSON.parse(rewardCardListFromLocalStorage);

  const checkIsExceedCardMaxCount = () => {
    if (rewardCardList.length >= MAX_CARD_COUNT) return true;

    return false;
  };

  const handleViewRewardCardList = () => {
    if (rewardCardList.length > 0) {
      navigate('/list');
    } else {
      toast({
        title: '請先新增集點卡！！！',
        position: 'top',
        status: 'info',
        duration: 2500,
        containerStyle: {
          marginTop: '2rem',
        },
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-14">
      <h1 className="text-5xl font-bold text-pink-400">乖寶寶集點卡</h1>
      <section>
        <Stack spacing="20px">
          <Button
            colorScheme="pink"
            size="lg"
            onClick={() => {
              if (checkIsExceedCardMaxCount()) {
                toast({
                  title: '已達最大集點卡數量(6張)，無法繼續新增。',
                  position: 'top',
                  status: 'warning',
                  duration: 2500,
                  containerStyle: {
                    marginTop: '2rem',
                  },
                });
                return;
              }
              onOpen();
            }}
          >
            建立集點卡
          </Button>
          <Button colorScheme="pink" size="lg" variant="outline" onClick={handleViewRewardCardList}>
            查看集點卡
          </Button>
        </Stack>
      </section>
      <CreateCardModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Home;
