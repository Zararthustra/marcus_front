import { useMediaQuery } from 'react-responsive';

import { defaultImg } from '@assets/index';
import { IMovieResult, ITVResults } from '@interfaces/index';

import './MovieItem.scss';

interface IMovieItem extends IMovieResult, ITVResults {}

const MovieItem = ({ movie }: { movie: Partial<IMovieItem> }) => {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  return (
    <div className="movieItem flex gap-2 align-center">
      {isMobile && movie.backdrop_path ? (
        <img
          className="movieItem__poster"
          src={`${import.meta.env.VITE_TMDB_IMG}/${movie.backdrop_path}`}
          alt={movie.title || movie.name}
        />
      ) : (
        <img
          className="movieItem__poster"
          src={
            !!movie.poster_path
              ? `${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`
              : defaultImg
          }
          alt={movie.title || movie.name}
        />
      )}
      <div className="flex-col justify-center w-100">
        <header>
          <a href={`/cinema/${movie.id}`}>
            <h2>{movie.title || movie.name}</h2>
          </a>
        </header>
        <p className="movieItem__synopsis">{movie.overview}</p>
        <footer className="flex w-100 justify-end align-center">
          <p className="movieItem__year">
            {movie.release_date && movie.release_date.split('-')[0]}
            {movie.first_air_date && movie.first_air_date.split('-')[0]}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MovieItem;
