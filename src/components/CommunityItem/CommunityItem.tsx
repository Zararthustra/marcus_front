import { useNavigate } from 'react-router-dom';

import {
  IconCritic,
  IconMasterpiece,
  IconVote,
  IconWatchlist
} from '@assets/index';
import { ICommunity } from '@interfaces/index';
import { capitalizeFirstLetter } from '@utils/formatters';

import './CommunityItem.scss';

const CommunityItem = ({
  id,
  username,
  user_critics,
  user_masterpieces,
  user_votes,
  user_watchlists
}: ICommunity) => {
  const navigate = useNavigate();

  return (
    <article
      className="communityItem"
      onClick={() => navigate(`/communaute/${id}`)}>
      <header>{capitalizeFirstLetter(username)}</header>
      <footer className="flex justify-center align-center gap-05 py-05">
        <div className="flex-col justify-between align-center">
          <IconCritic width={22} height={22} />
          <p className="m-0">{user_critics}</p>
        </div>
        <div className="flex-col justify-between align-center">
          <IconVote width={22} height={22} />
          <p className="m-0">{user_votes}</p>
        </div>
        <div className="flex-col justify-between align-center">
          <IconMasterpiece width={22} height={22} />
          <p className="m-0">{user_masterpieces}</p>
        </div>
        <div className="flex-col justify-between align-center">
          <IconWatchlist width={22} height={22} />
          <p className="m-0">{user_watchlists}</p>
        </div>
      </footer>
    </article>
  );
};

export default CommunityItem;
