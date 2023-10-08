import { Rate } from 'antd';
import { useState } from 'react';

import { IconTrash } from '@assets/index';
import { getLS } from '@services/localStorageService';
import { ModalCriticDelete } from '@components/index';

import './Critic.scss';

interface ICriticMovieProps {
  userId: number;
  movieId: number;
  movieName: string;
  userName: string;
  content: string;
  vote: number;
}

const CriticMovie = ({
  userId,
  userName,
  movieId,
  movieName,
  content,
  vote
}: ICriticMovieProps) => {
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
          <a href={`/communaute/${userId}`}>
            <h2>{userName}</h2>
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
          <Rate allowHalf disabled defaultValue={vote} />
        </footer>
      </div>
    </>
  );
};

export default CriticMovie;
