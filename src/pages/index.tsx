import { Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import RewardCardList from '@pages/RewardCardList';
import RewardCard from '@pages/RewardCard';

const App = () => {
  return (
    <div className="bg-pink-50/50 overflow-x-scroll">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RewardCardList />} />
        <Route path="/:cardId" element={<RewardCard />} />
      </Routes>
    </div>
  );
};

export default App;
