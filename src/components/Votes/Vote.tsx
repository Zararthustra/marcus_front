import { Rate } from 'antd';
import { Link } from 'react-router-dom';

import { getPlatformUri } from '@utils/formatters';

import './Vote.scss';

interface IVoteProps {
  userId: number;
  userName: string;
  movieId: number;
  movieName: string;
  value: number;
  platform: 'tv' | 'movie';
}

const Vote = ({
  userId,
  userName,
  movieId,
  movieName,
  value,
  platform
}: IVoteProps) => {
  return (
    <div className="vote flex-col align-center justify-between">
      <Rate allowHalf disabled defaultValue={value} />
      <a href={`/cinema/${getPlatformUri(platform)}/${movieId}`}>
        <h2>{movieName}</h2>
      </a>
      <Link className="vote__author" to={`/communaute/${userId}`}>
        {userName}
      </Link>
    </div>
  );
};

export default Vote;
