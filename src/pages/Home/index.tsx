import { Button, Stack, useDisclosure, useToast } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import CreateCardModal from './components/CreateCardModal';
import { WarningTwoIcon } from '@chakra-ui/icons';

const MAX_CARD_COUNT = 6;

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const checkIsExceedCardMaxCount = () => {
    const rewardCardList = localStorage.getItem('rewardCardList');
    if (rewardCardList && JSON.parse(rewardCardList).length >= MAX_CARD_COUNT) return true;

    return false;
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
                  icon: <WarningTwoIcon mt="5px" />,
                });
                return;
              }
              onOpen();
            }}
          >
            建立集點卡
          </Button>
          <Link to="/list">
            <Button colorScheme="pink" size="lg" variant="outline">
              查看集點卡
            </Button>
          </Link>
        </Stack>
      </section>
      <CreateCardModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Home;
