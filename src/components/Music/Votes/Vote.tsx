import { Rate } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IconTrash } from '@assets/index';
import { getLS } from '@services/localStorageService';
import { ModalMusicVoteDelete } from '@components/index';
import { capitalizeFirstLetter } from '@utils/formatters';

import './Vote.scss';

interface IVoteProps {
  id: string;
  albumId: string;
  albumName: string;
  value: number;
  artistId: string;
  artistName: string;
  imageUrl: string;
  user: {
    id: number;
    username: string;
  };
}

const Vote = ({
  id,
  albumId,
  albumName,
  value,
  artistId,
  artistName,
  imageUrl,
  user
}: IVoteProps) => {
  const isOwner = getLS('name') === user.username;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  return (
    <>
      <ModalMusicVoteDelete
        setShowModal={setIsDeleting}
        showModal={isDeleting}
        id={id}
        albumName={albumName}
      />

      <div className="vote flex-col align-center justify-between">
        <Rate allowHalf disabled defaultValue={value} />
        <Link to={`/musique/${artistId}`}>
          <h2>{albumName}</h2>
        </Link>
        <Link className="vote__artist" to={`/musique/${artistId}`}>
          {capitalizeFirstLetter(artistName)}
        </Link>
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
          <Link className="vote__author" to={`/communaute/${user.id}`}>
            {user.username}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Vote;
