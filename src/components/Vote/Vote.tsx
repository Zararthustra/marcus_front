import { Link } from 'react-router-dom';

import './Vote.scss';
import { Rate } from 'antd';

interface IVoteProps {
  userId: number;
  userName: string;
  movieId: number;
  movieName: string;
  value: number;
}

const Vote = ({ userId, userName, movieId, movieName, value }: IVoteProps) => {
  return (
    <div className="vote flex-col align-center justify-between">
      <Rate allowHalf disabled defaultValue={value} />
      <a href={`/cinema/${movieId}`}>
        <h2>{movieName}</h2>
      </a>
      <Link className="vote__author" to={`/communaute/${userId}`}>
        {userName}
      </Link>
    </div>
  );
};

export default Vote;
