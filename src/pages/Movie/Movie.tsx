import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  Button,
  CriticMovie,
  ModalCritic,
  ModalVote,
  MovieCredits,
  MovieDescription,
  MovieProviders
} from '@components/index';
import {
  IconClapLoader,
  IconCritic,
  IconShare,
  IconVote,
  defaultImg
} from '@assets/index';
import {
  useQueryMasterpieces,
  useQueryMovie,
  useQueryMovieCritics,
  useQueryVotes,
  useQueryWatchlists
} from '@queries/index';
import { getLS } from '@services/localStorageService';

import './Movie.scss';

const Movie = () => {
  const { movieId } = useParams();
  const userId = parseInt(getLS('userId'));
  const userName = getLS('name');
  const [isCriticizing, setIsCriticizing] = useState<boolean>(false);
  const [hasCriticized, setHasCriticized] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  const { data: movie, isLoading } = useQueryMovie(movieId as string);
  const { data: movieCritics } = useQueryMovieCritics(movieId as string);
  const { data: masterpieces } = useQueryMasterpieces(undefined, userId);
  const { data: watchlists } = useQueryWatchlists(undefined, userId);
  const { data: votes } = useQueryVotes(undefined, userId);

  useEffect(() => {
    if (!!movieCritics)
      setHasCriticized(
        !!movieCritics.data.filter(
          (item) => item.user_name === userName && !!item.content
        ).length
      );
  }, [movieCritics]);

  useEffect(() => {
    if (!!votes)
      setHasVoted(
        !!votes.data.filter(
          (item) =>
            item.movie_id === parseInt(movieId as string) &&
            item.user_name === userName &&
            !!item.value
        ).length
      );
  }, [votes]);

  if (isLoading)
    return (
      <div className="movie flex justify-center mt-5">
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!movie)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <>
      <ModalCritic
        movieId={movie.id}
        movieName={movie.title}
        showModal={isCriticizing}
        platform="movie"
        setShowModal={setIsCriticizing}
      />
      <ModalVote
        movieId={movie.id}
        movieName={movie.title}
        showModal={isVoting}
        platform="movie"
        setShowModal={setIsVoting}
      />

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
          {!hasCriticized && (
            <Button primary onClick={() => setIsCriticizing(true)}>
              <IconCritic width={20} height={20} />
              <p className="m-0">Critiquer</p>
            </Button>
          )}
          {!hasVoted && (
            <Button primary onClick={() => setIsVoting(true)}>
              <IconVote width={20} height={20} />
              <p className="m-0">Voter</p>
            </Button>
          )}
          {!!navigator.share && (
            <Button
              onClick={() =>
                navigator.share({
                  text: "Voici un film que j'ai découvert",
                  title: movie.title,
                  url: window.location.href
                })
              }>
              <IconShare width={20} height={20} />
              <p className="m-0">Partager</p>
            </Button>
          )}
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
                movieId={movie.id}
                movieName={movie.title}
                content={critic.content}
                vote={critic.vote}
              />
            ))}
          </>
        )}
      </main>
    </>
  );
};

export default Movie;
