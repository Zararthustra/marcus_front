import { Link } from 'react-router-dom';

import { getPlatformUri } from '@utils/formatters';

import './Critic.scss';

interface ICriticProps {
  userId: number;
  userName: string;
  movieId: number;
  movieName: string;
  content: string;
  platform: 'tv' | 'movie';
}

const Critic = ({
  userId,
  userName,
  movieId,
  movieName,
  content,
  platform
}: ICriticProps) => (
  <div className="critic">
    <header>
      <a href={`/cinema/${getPlatformUri(platform)}/${movieId}`}>
        <h2>{movieName}</h2>
      </a>
    </header>
    <p className="critic__content">{content}</p>
    <footer className="flex w-100 justify-end">
      <Link to={`/communaute/${userId}`}>{userName}</Link>
    </footer>
  </div>
);

export default Critic;
