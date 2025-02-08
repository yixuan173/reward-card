import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('@pages/Home'));
const RewardCardList = lazy(() => import('@pages/RewardCardList'));
const RewardCard = lazy(() => import('@pages/RewardCard'));

const App = () => {
  return (
    <div className="bg-pink-50/50 overflow-x-scroll max-w-4xl m-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RewardCardList />} />
        <Route path="/:cardId" element={<RewardCard />} />
      </Routes>
    </div>
  );
};

export default App;
