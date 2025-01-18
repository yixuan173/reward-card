import { useParams } from 'react-router-dom';

const RewardCard = () => {
  const { cardId } = useParams<{ cardId: string }>();

  return <div>RewardCard: {cardId}</div>;
};

export default RewardCard;
