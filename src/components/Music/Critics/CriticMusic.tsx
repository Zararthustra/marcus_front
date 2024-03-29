import { useState } from 'react';
import { Link } from 'react-router-dom';

import { IconTrash } from '@assets/index';
import { getLS } from '@services/localStorageService';
import { capitalizeFirstLetter } from '@utils/formatters';
import { ModalAlbum, ModalMusicCriticDelete } from '@components/index';

import './Critic.scss';

interface ICriticMusicProps {
  id: string;
  userId: number;
  userName: string;
  content: string;
  albumId: string;
  albumName: string;
  artistId: string;
  artistName: string;
}

const CriticMusic = ({
  id,
  userId,
  userName,
  content,
  albumId,
  albumName,
  artistId,
  artistName
}: ICriticMusicProps) => {
  const isOwner = getLS('name') === userName;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState({
    albumId: '',
    albumName: '',
    imageUrl: ''
  });

  return (
    <>
      <ModalMusicCriticDelete
        setShowModal={setIsDeleting}
        showModal={isDeleting}
        id={id}
        albumName={albumName}
      />

      <ModalAlbum
        setSelectedAlbum={setSelectedAlbum}
        selectedAlbum={selectedAlbum}
      />

      <div className="critic">
        <header>
          <div className="flex justify-between align-center">
            <h2
              style={{ cursor: 'pointer' }}
              onClick={() =>
                setSelectedAlbum({
                  albumId,
                  albumName,
                  imageUrl: ''
                })
              }>
              {albumName}
            </h2>

            {isOwner && (
              <IconTrash
                color="var(--color-primary-500)"
                onClick={() => setIsDeleting(true)}
              />
            )}
          </div>
          <Link
            to={`/musique/${artistId}`}
            className="f-m f-b"
            style={{ color: 'var(--color-grey-400)' }}>
            {capitalizeFirstLetter(artistName)}
          </Link>
        </header>
        <p className="critic__content">{content}</p>
        <footer className="flex w-100 justify-end">
          <Link to={`/communaute/${userId}`}>{userName}</Link>
        </footer>
      </div>
    </>
  );
};

export default CriticMusic;
