import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Spinner } from '@chakra-ui/react';

const Home = lazy(() => import('@pages/Home'));
const RewardCardList = lazy(() => import('@pages/RewardCardList'));
const RewardCard = lazy(() => import('@pages/RewardCard'));

const Loading = () => (
  <div className="h-screen flex justify-center items-center">
    <Spinner thickness="4px" speed="0.7s" emptyColor="gray.200" color="pink.400" size="xl" />
  </div>
);

const App = () => {
  return (
    <div className="bg-pink-50/50 overflow-x-scroll max-w-4xl m-auto">
      <Suspense fallback={Loading()}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<RewardCardList />} />
          <Route path="/:cardId" element={<RewardCard />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
