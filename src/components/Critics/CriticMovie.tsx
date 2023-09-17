import { Link } from 'react-router-dom';

import { getPlatformUri } from '@utils/formatters';

import './Critic.scss';
import { Rate } from 'antd';

interface ICriticMovieProps {
  userId: number;
  userName: string;
  content: string;
  vote: number;
}

const CriticMovie = ({
  userId,
  userName,
  content,
  vote
}: ICriticMovieProps) => (
  <div className="critic">
    <header>
      <a href={`/communaute/${userId}`}>
        <h2>{userName}</h2>
      </a>
    </header>
    <p className="critic__content">{content}</p>
    <footer className="flex w-100 justify-end">
      <Rate allowHalf disabled defaultValue={vote} />
    </footer>
  </div>
);

export default CriticMovie;
