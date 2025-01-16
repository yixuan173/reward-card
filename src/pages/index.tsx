import { Routes, Route } from 'react-router-dom';

import Home from '@pages/Home';
import RewardCardList from '@pages/RewardCardList';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<RewardCardList />} />
      </Routes>
    </div>
  );
};

export default App;
