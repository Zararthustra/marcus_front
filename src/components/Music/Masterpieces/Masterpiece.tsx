import { useState } from 'react';
import { Link } from 'react-router-dom';

import { ModalAlbum } from '@components/index';
import { capitalizeFirstLetter } from '@utils/formatters';

import './Masterpiece.scss';

interface IMasterpieceProps {
  id: string;
  albumId: string;
  albumName: string;
  artistId: string;
  artistName: string;
  imageUrl: string;
  user: {
    id: number;
    username: string;
  };
}

const Masterpiece = ({
  id,
  albumId,
  albumName,
  artistId,
  artistName,
  imageUrl,
  user
}: IMasterpieceProps) => {
  const [selectedAlbum, setSelectedAlbum] = useState({
    albumId: '',
    albumName: '',
    imageUrl: ''
  });

  return (
    <>
      <ModalAlbum
        setSelectedAlbum={setSelectedAlbum}
        selectedAlbum={selectedAlbum}
      />

      <div
        className="music-masterpiece flex align-center gap-1"
        onClick={() =>
          setSelectedAlbum({
            albumId,
            albumName,
            imageUrl
          })
        }>
        <img
          className="music-masterpiece__img"
          src={imageUrl}
          alt={albumName}
          title={albumName}
        />
        <div>
          <h2>
            {albumName.length > 28 ? albumName.slice(0, 25) + '...' : albumName}
          </h2>
          <Link
            className="music-masterpiece__artist"
            to={`/musique/${artistId}`}>
            {capitalizeFirstLetter(artistName)}
          </Link>
          <div>
            <Link
              className="music-masterpiece__author"
              to={`/communaute/${user.id}`}>
              {user.username}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Masterpiece;
