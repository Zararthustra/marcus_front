import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { defaultImg } from '@assets/index';
import { IMovieDetails } from '@interfaces/index';
import { getPlatformUri } from '@utils/formatters';

import './Masterpiece.scss';

interface IMasterpieceProps {
  userId: number;
  userName: string;
  movieId: number;
  movieName: string;
  movieDetails: IMovieDetails;
  platform: 'tv' | 'movie';
}

const Masterpiece = ({
  userId,
  userName,
  movieId,
  movieName,
  movieDetails,
  platform
}: IMasterpieceProps) => {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });

  return (
    <div className="masterpiece flex gap-2 align-center">
      {isMobile && movieDetails.backdrop_path ? (
        <img
          className="masterpiece__poster"
          src={`${import.meta.env.VITE_TMDB_IMG}/${movieDetails.backdrop_path}`}
          alt={movieName}
        />
      ) : (
        <img
          className="masterpiece__poster"
          src={
            !!movieDetails.poster_path
              ? `${import.meta.env.VITE_TMDB_IMG}/${movieDetails.poster_path}`
              : defaultImg
          }
          alt={movieName}
        />
      )}
      <div className="flex-col justify-center w-100">
        <header>
          <a href={`/cinema/${getPlatformUri(platform)}/${movieId}`}>
            <h2>{movieName}</h2>
          </a>
        </header>
        <p className="masterpiece__synopsis">{movieDetails.synopsis}</p>
        <footer className="flex w-100 justify-between align-center">
          <div className="flex">
            <p className="masterpiece__year">
              {movieDetails.released_date.split('-')[0]}
            </p>
            {!!movieDetails.director && (
              <p className="masterpiece__year f-b ml-05">
                {movieDetails.director}
              </p>
            )}
          </div>
          <Link to={`/communaute/${userId}`}>{userName}</Link>
        </footer>
      </div>
    </div>
  );
};

export default Masterpiece;
