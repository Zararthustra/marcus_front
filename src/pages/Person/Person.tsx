import { Breadcrumb, Empty } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  IconArrowRight,
  IconClapLoader,
  IconCritic,
  IconMasterpiece,
  IconSearchMovies,
  IconVote,
  defaultImg
} from '@assets/index';
import {
  useQueryPerson,
  useQueryPersonMovies,
  useQueryPersonTVs
} from '@queries/index';

import './Person.scss';
import { handleRole } from '@utils/formatters';

const Person = () => {
  const { personId } = useParams();

  const { data: person, isLoading } = useQueryPerson(personId as string);
  const { data: personMovies, isLoading: loadingMovies } = useQueryPersonMovies(
    parseInt(personId as string)
  );
  const { data: personTVs, isLoading: isLoadingTV } = useQueryPersonTVs(
    parseInt(personId as string)
  );

  if (isLoading)
    return (
      <div className="movie flex justify-center mt-5">
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!person)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <main className="person flex-col align-center w-100 px-1">
      <Breadcrumb
        separator=""
        className="mb-1"
        items={[
          {
            title: 'Cinéma',
            href: '/cinema',
            menu: {
              items: [
                {
                  key: '1',
                  label: (
                    <Link
                      className="flex w-100 justify-between align-center"
                      to="/cinema?tab=0">
                      <IconSearchMovies width={24} height={24} />
                      <p className="m-0">Recherche</p>
                    </Link>
                  )
                },
                {
                  key: '2',
                  label: (
                    <Link
                      className="flex w-100 justify-between align-center"
                      to="/cinema?tab=1">
                      <IconCritic width={24} height={24} />
                      <p className="m-0">Critiques</p>
                    </Link>
                  )
                },
                {
                  key: '3',
                  label: (
                    <Link
                      className="flex w-100 justify-between align-center"
                      to="/cinema?tab=2">
                      <IconVote width={24} height={24} />
                      <p className="m-0">Votes</p>
                    </Link>
                  )
                },
                {
                  key: '4',
                  label: (
                    <Link
                      className="flex w-100 justify-between gap-1 align-center"
                      to="/cinema?tab=3">
                      <IconMasterpiece width={24} height={24} />
                      <p className="m-0">Chefs d'oeuvres</p>
                    </Link>
                  )
                }
              ]
            }
          },
          {
            type: 'separator',
            separator: '/'
          },
          {
            title: 'Personnes'
          },
          {
            type: 'separator',
            separator: '/'
          },
          {
            title: person.name
          }
        ]}
      />

      <header className="header">
        <img
          src={
            !!person.profile_path
              ? `${import.meta.env.VITE_TMDB_IMG}/${person.profile_path}`
              : defaultImg
          }
          alt={person.name}
          className=""
        />

        <div>
          <h1>{person.name}</h1>
          <div className="header__lifespan flex align-center justify-center gap-05">
            <p>{person.birthday}</p>
            {person.deathday && (
              <IconArrowRight
                width={13}
                height={13}
                style={{ color: 'var(--color-grey-500)' }}
              />
            )}
            {person.deathday && <p>{person.deathday}</p>}
          </div>
          <p className="m-0" style={{ textAlign: 'center' }}>
            {person.place_of_birth}
          </p>
          <div
            className="w-100 mt-1"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '1px'
            }}
          />
          {/* <p className="m-0">{handleRole(person.known_for_department)}</p> */}
          <p className="header__biography">{person.biography}</p>
        </div>
      </header>

      {/* Movies */}
      {(!!personMovies?.crew.length || !!personMovies?.cast.length) && (
        <div
          className="flex align-center mt-2 w-100"
          style={{ maxWidth: '63rem' }}>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="px-1">Films</h1>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
        </div>
      )}
      {
        // Loading
        loadingMovies ? (
          <div className="flex justify-center my-5">
            <IconClapLoader
              width={100}
              height={100}
              className="loader-cinema"
            />
          </div>
        ) : personMovies ? (
          // Success
          <>
            {/* Cast */}
            {!!personMovies.cast.length && <h2>Casting</h2>}
            <div className="movie__persons flex mb-2">
              {personMovies.cast
                .sort((p1, p2) =>
                  p1.popularity < p2.popularity
                    ? 1
                    : p1.popularity > p2.popularity
                    ? -1
                    : 0
                )
                .map((movie, index) => (
                  <article
                    className="movie__person pb-1"
                    key={index}
                    // onClick={() => setPerson({ id: actor.id, name: actor.name })}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_TMDB_IMG}/${
                              movie.poster_path
                            }`
                          : defaultImg
                      }
                      alt={movie.title}
                    />

                    <div className="flex-col justify-between align-center">
                      <Link
                        to={`/cinema/films/${movie.id}`}
                        className="f-b f-s mb-05">
                        {movie.title.length > 25
                          ? movie.title.slice(0, 22) + '...'
                          : movie.title}
                      </Link>
                      <p className="character">
                        {movie.character?.includes('/')
                          ? movie.character.split('/')[1]
                          : movie.character}
                      </p>
                    </div>
                  </article>
                ))}
            </div>

            {/* Crew */}
            {!!personMovies.crew.length && <h2>Technique</h2>}
            <div className="movie__persons flex">
              {personMovies.crew
                .sort((p1, p2) =>
                  p1.popularity < p2.popularity
                    ? 1
                    : p1.popularity > p2.popularity
                    ? -1
                    : 0
                )
                .map((movie, index) => (
                  <article
                    className="movie__person pb-1"
                    key={index}
                    // onClick={() => setPerson({ id: actor.id, name: actor.name })}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_TMDB_IMG}/${
                              movie.poster_path
                            }`
                          : defaultImg
                      }
                      alt={movie.title}
                    />

                    <div className="flex-col justify-between align-center">
                      <Link
                        to={`/cinema/films/${movie.id}`}
                        className="f-b f-s mb-05">
                        {movie.title.length > 25
                          ? movie.title.slice(0, 22) + '...'
                          : movie.title}
                      </Link>
                      <p className="character">{movie.job}</p>
                    </div>
                  </article>
                ))}
            </div>
          </>
        ) : (
          // Error
          <p>Une erreur est survenue</p>
        )
      }

      {/* TVs */}
      {(!!personTVs?.crew.length || !!personTVs?.cast.length) && (
        <div
          className="flex align-center mt-2 w-100"
          style={{ maxWidth: '63rem' }}>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="px-1">Séries</h1>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
        </div>
      )}
      {
        // Loading
        isLoadingTV ? (
          <div className="flex justify-center my-5">
            <IconClapLoader
              width={100}
              height={100}
              className="loader-cinema"
            />
          </div>
        ) : personTVs ? (
          // Success
          <>
            {/* Cast */}
            {!!personTVs.cast.length && <h2>Casting</h2>}
            <div className="movie__persons flex mb-2">
              {personTVs.cast
                .sort((p1, p2) =>
                  p1.popularity < p2.popularity
                    ? 1
                    : p1.popularity > p2.popularity
                    ? -1
                    : 0
                )
                .map((movie, index) => (
                  <article
                    className="movie__person pb-1"
                    key={index}
                    // onClick={() => setPerson({ id: actor.id, name: actor.name })}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_TMDB_IMG}/${
                              movie.poster_path
                            }`
                          : defaultImg
                      }
                      alt={movie.name}
                    />

                    <div className="flex-col justify-between align-center">
                      <Link
                        to={
                          !!movie.first_air_date
                            ? `/cinema/series/${movie.id}`
                            : `/cinema/films/${movie.id}`
                        }
                        className="f-b f-s mb-05">
                        {movie.name.length > 25
                          ? movie.name.slice(0, 22) + '...'
                          : movie.name}
                      </Link>
                      <p className="character">
                        {movie.character?.includes('/')
                          ? movie.character.split('/')[1]
                          : movie.character}
                      </p>
                    </div>
                  </article>
                ))}
            </div>

            {/* Crew */}
            {!!personTVs.crew.length && <h2>Technique</h2>}
            <div className="movie__persons flex">
              {personTVs.crew
                .sort((p1, p2) =>
                  p1.popularity < p2.popularity
                    ? 1
                    : p1.popularity > p2.popularity
                    ? -1
                    : 0
                )
                .map((movie, index) => (
                  <article
                    className="movie__person pb-1"
                    key={index}
                    // onClick={() => setPerson({ id: actor.id, name: actor.name })}
                  >
                    <img
                      src={
                        movie.poster_path
                          ? `${import.meta.env.VITE_TMDB_IMG}/${
                              movie.poster_path
                            }`
                          : defaultImg
                      }
                      alt={movie.name}
                    />

                    <div className="flex-col justify-between align-center">
                      <Link
                        to={`/cinema/films/${movie.id}`}
                        className="f-b f-s mb-05">
                        {movie.name.length > 25
                          ? movie.name.slice(0, 22) + '...'
                          : movie.name}
                      </Link>
                      <p className="character">{movie.job}</p>
                    </div>
                  </article>
                ))}
            </div>
          </>
        ) : (
          // Error
          <p>Une erreur est survenue</p>
        )
      }
    </main>
  );
};

export default Person;
