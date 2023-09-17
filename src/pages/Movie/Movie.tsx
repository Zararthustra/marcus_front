import { Empty } from 'antd';
import { useParams } from 'react-router-dom';

import {
  Critic,
  CriticMovie,
  MovieCredits,
  MovieDescription,
  MovieProviders
} from '@components/index';
import { useQueryMovie } from '@queries/tmdb';
import { IconClapLoader, defaultImg } from '@assets/index';

import './Movie.scss';
import { useQueryMovieCritics } from '@queries/critic';

const Movie = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading } = useQueryMovie(movieId as string);
  const { data: movieCritics } = useQueryMovieCritics(movieId as string);

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
        alt={movie.title}
        className="movie__backdrop"
      />

      <MovieDescription
        overview={movie.overview}
        title={movie.title}
        poster={movie.poster_path}
        year={movie.release_date}
      />

      <MovieCredits cast={movie.credits.cast} crew={movie.credits.crew} />

      {!!movie.videos.results.length && (
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

      {movieCritics && <h1 className="my-2">Critiques</h1>}
      {movieCritics &&
        movieCritics.data.map((critic, index) => (
          <CriticMovie
            key={index}
            userId={critic.user_id}
            userName={critic.user_name}
            content={critic.content}
            vote={critic.vote}
          />
        ))}
    </main>
  );
};

export default Movie;
