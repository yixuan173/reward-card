import { Button, Stack, useDisclosure } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import CreateCardModal from './components/CreateCardModal';

const Home = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-14">
      <h1 className="text-5xl font-bold text-pink-400">乖寶寶集點卡</h1>
      <section>
        <Stack spacing="20px">
          <Button colorScheme="pink" size="lg" onClick={onOpen}>
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
