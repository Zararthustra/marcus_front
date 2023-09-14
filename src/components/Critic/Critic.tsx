import { useState } from 'react';

import './Critic.scss';
import { Link } from 'react-router-dom';

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
}: ICriticProps) => {
  return (
    <div className="critic">
      <header>
        <h2>
          <a href={`/cinema/${movieId}`}>{movieName}</a>
        </h2>
      </header>
      <p className="critic__content">{content}</p>
      <footer className="flex w-100 justify-end">
        <Link to={`/communaute/${userId}`}>{userName}</Link>
      </footer>
    </div>
  );
};

export default Critic;
