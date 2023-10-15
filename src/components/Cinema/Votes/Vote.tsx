import { Rate } from 'antd';
import { Link } from 'react-router-dom';

import { getPlatformUri } from '@utils/formatters';

import './Vote.scss';
import { useState } from 'react';
import { getLS } from '@services/localStorageService';
import { ModalVoteDelete } from '../..';
import { IconTrash } from '@assets/index';

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
  const isOwner = getLS('name') === userName;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <>
      <ModalVoteDelete
        setShowModal={setIsDeleting}
        showModal={isDeleting}
        movieId={movieId}
        movieName={movieName}
      />

      <div className="vote flex-col align-center justify-between">
        <Rate allowHalf disabled value={value} />
        <a href={`/cinema/${getPlatformUri(platform)}/${movieId}`}>
          <h2>
            {movieName.length > 28 ? movieName.slice(0, 25) + '...' : movieName}
          </h2>
        </a>
        <div className="flex align-center justify-between w-100">
          {isOwner ? (
            <IconTrash
              className="vote__del"
              color="var(--color-primary-500)"
              onClick={() => setIsDeleting(true)}
            />
          ) : (
            <div />
          )}
          <Link className="vote__author" to={`/communaute/${userId}`}>
            {userName}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Vote;
