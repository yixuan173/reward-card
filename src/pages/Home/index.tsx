import { Button, Stack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-14">
      <h1 className="text-5xl font-bold text-pink-400">乖寶寶集點卡</h1>
      <section>
        <Stack spacing="20px">
          <Button colorScheme="pink" size="lg">
            建立集點卡
          </Button>
          <Link to="/list">
            <Button colorScheme="pink" size="lg" variant="outline">
              查看集點卡
            </Button>
          </Link>
        </Stack>
      </section>
    </div>
  );
};

export default Home;
