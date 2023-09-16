import { Link } from 'react-router-dom';

import './Critic.scss';

interface ICriticProps {
  userId: number;
  userName: string;
  movieId: number;
  movieName: string;
  content: string;
}

const Critic = ({
  userId,
  userName,
  movieId,
  movieName,
  content
}: ICriticProps) => (
  <div className="critic">
    <header>
      <a href={`/cinema/${movieId}`}>
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
