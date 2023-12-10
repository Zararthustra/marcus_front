import { IAlbum } from '@interfaces/index';
import { defaultImg } from '@assets/index';

import './MusicItem.scss';

interface AlbumItemProps {
  album: IAlbum;
  selectedAlbum: {
    albumId: string;
    albumName: string;
    imageUrl: string;
  };
  setSelectedAlbum: (value: any) => void;
  setSearchParams: (value: any) => void;
}

const AlbumItem = ({
  album,
  setSearchParams,
  setSelectedAlbum,
  selectedAlbum
}: AlbumItemProps) => {
  return (
    <div
      className={`musicItem albumItem flex align-center gap-1 p-1 br-s ${
        selectedAlbum.albumId === album.id ? 'albumItem--selected' : ''
      }`}
      onClick={() => {
        setSelectedAlbum({
          albumId: album.id,
          albumName: album.name,
          imageUrl: !!album.images.length ? album.images[1].url : defaultImg
        });
        setSearchParams({
          albumId: album.id,
          albumName: album.name
        });
      }}>
      <img
        src={!!album.images.length ? album.images[1].url : defaultImg}
        alt={album.name}
      />
      <div className="flex-col w-100">
        <h3>{album.name}</h3>
        <p className="m-0 f-xs">{album.release_date.split('-')[0]}</p>
        <div className="musicItem__authors flex flex-wrap">
          {album.artists.map((artist) => (
            <a
              className="m-0 f-xs mr-05 f-b"
              key={artist.id}
              href={`/musique/${artist.id}`}>
              {artist.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlbumItem;
