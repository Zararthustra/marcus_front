import { Empty } from 'antd';
import { useParams } from 'react-router-dom';

import {
  MovieCredits,
  MovieDescription,
  MovieProviders
} from '@components/index';
import { useQueryTV } from '@queries/tmdb';
import { IconClapLoader, defaultImg } from '@assets/index';

import './Movie.scss';

const TV = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading } = useQueryTV(movieId as string);

  if (isLoading)
    return (
      <div className="flex justify-center mt-5">
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!movie)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <main className="movie flex-col align-center w-100 px-1">
      <img
        src={
          !!movie.backdrop_path
            ? `${import.meta.env.VITE_TMDB_IMG}/${movie.backdrop_path}`
            : defaultImg
        }
        alt={movie.name}
        className="movie__backdrop"
      />

      <MovieDescription
        overview={movie.overview}
        title={movie.name}
        poster={movie.poster_path}
        year={movie.first_air_date}
      />

      <MovieCredits cast={movie.credits.cast} crew={movie.credits.crew} />

      {!!movie.videos.results.length && !!movie.videos.results[0].key && (
        <div className="movie__trailer my-4">
          <iframe
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen></iframe>
        </div>
      )}

      <MovieProviders
        flatrate={movie['watch/providers'].results.FR?.flatrate}
        rent={movie['watch/providers'].results.FR?.rent}
        buy={movie['watch/providers'].results.FR?.buy}
      />
    </main>
  );
};

export default TV;
