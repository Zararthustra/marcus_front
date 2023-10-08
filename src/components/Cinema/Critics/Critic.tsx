import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IconTrash } from '@assets/index';
import { getPlatformUri } from '@utils/formatters';
import { getLS } from '@services/localStorageService';
import { ModalCriticDelete } from '@components/index';

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
}: ICriticProps) => {
  const isOwner = getLS('name') === userName;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <>
      <ModalCriticDelete
        setShowModal={setIsDeleting}
        showModal={isDeleting}
        movieId={movieId}
        movieName={movieName}
      />

      <div className="critic">
        <header className="flex justify-between align-center">
          <a href={`/cinema/${getPlatformUri(platform)}/${movieId}`}>
            <h2>{movieName}</h2>
          </a>
          {isOwner && (
            <IconTrash
              color="var(--color-primary-500)"
              onClick={() => setIsDeleting(true)}
            />
          )}
        </header>
        <p className="critic__content">{content}</p>
        <footer className="flex w-100 justify-end">
          <Link to={`/communaute/${userId}`}>{userName}</Link>
        </footer>
      </div>
    </>
  );
};

export default Critic;
