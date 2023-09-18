import { Empty } from 'antd';
import { useParams } from 'react-router-dom';

import {
  Button,
  CriticMovie,
  MovieCredits,
  MovieDescription,
  MovieProviders
} from '@components/index';
import {
  IconClapLoader,
  IconCritic,
  IconVote,
  defaultImg
} from '@assets/index';
import {
  useQueryMasterpieces,
  useQueryMovie,
  useQueryMovieCritics,
  useQueryWatchlists
} from '@queries/index';
import { getLS } from '@services/localStorageService';

import './Movie.scss';

const Movie = () => {
  const { movieId } = useParams();
  const userId = parseInt(getLS('userId'));
  const userName = getLS('name');
  const { data: movie, isLoading } = useQueryMovie(movieId as string);
  const { data: masterpieces } = useQueryMasterpieces(undefined, userId);
  const { data: watchlists } = useQueryWatchlists(undefined, userId);
  const { data: movieCritics } = useQueryMovieCritics(movieId as string);

  if (isLoading)
    return (
      <div className="movie flex justify-center mt-5">
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
        movieId={movie.id}
        userName={userName}
        platform="movie"
        overview={movie.overview}
        title={movie.title}
        poster={movie.poster_path}
        year={movie.release_date}
        masterpieces={masterpieces?.data}
        watchlists={watchlists?.data}
      />

      <div className="movie__buttons flex gap-05 mb-3">
        <Button primary>
          <IconCritic width={20} height={20} />
          <p className="m-0">Critiquer</p>
        </Button>
        <Button primary>
          <IconVote width={20} height={20} />
          <p className="m-0">Voter</p>
        </Button>
      </div>

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

      {!!movie['watch/providers'].results.FR && (
        <MovieProviders
          flatrate={movie['watch/providers'].results.FR?.flatrate}
          rent={movie['watch/providers'].results.FR?.rent}
          buy={movie['watch/providers'].results.FR?.buy}
        />
      )}

      {!!movieCritics && !!movieCritics.data.length && (
        <>
          <h1 className="my-2">Critiques</h1>
          {movieCritics.data.map((critic, index) => (
            <CriticMovie
              key={index}
              userId={critic.user_id}
              userName={critic.user_name}
              content={critic.content}
              vote={critic.vote}
            />
          ))}
        </>
      )}
    </main>
  );
};

export default Movie;
