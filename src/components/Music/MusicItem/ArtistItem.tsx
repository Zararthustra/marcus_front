import { useNavigate } from 'react-router-dom';

import { defaultImg } from '@assets/index';

import './MusicItem.scss';

interface IArtistItemProps {
  id: string;
  name: string;
  genres: string[];
  images: { url: string }[];
}

const ArtistItem = ({ id, name, genres, images }: IArtistItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      className="musicItem flex align-center gap-1 px-1"
      onClick={() => navigate(`/musique/${id}`)}>
      <img src={!!images.length ? images[1].url : defaultImg} alt={name} />
      <div className="flex-col w-100">
        <h2>{name}</h2>
        <div className="musicItem__authors flex flex-wrap">
          {genres.map((gender, index) => (
            <p className="m-0 f-xs mr-05" key={index}>
              {gender}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtistItem;
