import { useState } from 'react';

import { defaultImg } from '@assets/index';
import { ICast, ICrew } from '@interfaces/index';
import { ModalPersonMovies } from '@components/index';

interface IMovieCreditsProps {
  cast: ICast[];
  crew: ICrew[];
}

const MovieCredits = ({ cast, crew }: IMovieCreditsProps) => {
  const [person, setPerson] = useState<{ id: number; name: string }>();

  return (
    <>
      {!!person && (
        <ModalPersonMovies
          showModal={!!person}
          setShowModal={setPerson}
          personId={person.id}
          personName={person.name}
        />
      )}

      {!!cast.length && <h2 className="mb-1">Casting</h2>}
      <div className="movie__persons flex">
        {cast
          .sort((p1, p2) =>
            p1.popularity < p2.popularity
              ? 1
              : p1.popularity > p2.popularity
              ? -1
              : 0
          )
          .slice(0, 20)
          .map((actor, index) => {
            return (
              <article
                className="movie__person pb-1"
                style={{ cursor: 'pointer' }}
                key={index}
                onClick={() => setPerson({ id: actor.id, name: actor.name })}>
                <img
                  src={
                    actor.profile_path
                      ? `${import.meta.env.VITE_TMDB_IMG}/${actor.profile_path}`
                      : defaultImg
                  }
                  alt={actor.name}
                />

                <div className="flex-col justify-between align-center">
                  <p className="f-b mb-05">{actor.name}</p>
                  <p className="character">
                    {actor.character.includes('/')
                      ? actor.character.split('/')[1]
                      : actor.character}
                  </p>
                </div>
              </article>
            );
          })}
      </div>

      {!!crew.length && <h2 className="mb-1 mt-2">Équipe technique</h2>}
      <div className="movie__persons flex">
        {crew
          .sort((p1, p2) =>
            p1.popularity < p2.popularity
              ? 1
              : p1.popularity > p2.popularity
              ? -1
              : 0
          )
          .slice(0, 20)
          .map((actor, index) => {
            return (
              <article
                style={{ cursor: 'pointer' }}
                className="movie__person pb-1"
                key={index}
                onClick={() => setPerson({ id: actor.id, name: actor.name })}>
                <img
                  src={
                    actor.profile_path
                      ? `${import.meta.env.VITE_TMDB_IMG}/${actor.profile_path}`
                      : defaultImg
                  }
                  alt={actor.name}
                />

                <div className="flex-col justify-between align-center">
                  <p className="f-b mb-05">{actor.name}</p>
                  <p className="character">{actor.job}</p>
                </div>
              </article>
            );
          })}
      </div>
    </>
  );
};

export default MovieCredits;
