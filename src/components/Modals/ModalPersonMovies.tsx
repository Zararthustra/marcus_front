import { Modal } from 'antd';
import { Link } from 'react-router-dom';

import { IconClapLoader, defaultImg } from '@assets/index';
import { useQueryPersonMovies, useQueryPersonTVs } from '@queries/index';

interface IModalPersonMoviesProps {
  personName: string;
  personId: number;
  showModal: boolean;
  setShowModal: (value: any) => void;
}

const ModalPersonMovies = ({
  personName,
  personId,
  showModal,
  setShowModal
}: IModalPersonMoviesProps) => {
  const { data: personMovies, isLoading } = useQueryPersonMovies(personId);
  const { data: personTVs, isLoading: isLoadingTV } =
    useQueryPersonTVs(personId);

  return (
    <Modal
      centered
      open={showModal}
      onCancel={() => setShowModal(false)}
      // width={400}
      footer={null}>
      <div
        className="pr-05 mt-2"
        style={{ maxHeight: '75vh', overflow: 'scroll' }}>
        <h1 style={{ textAlign: 'center' }}>{personName}</h1>
        {/* Movie */}
        {(!!personMovies?.crew.length || !!personMovies?.cast.length) && (
          <div className="flex align-center mt-2 w-100">
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
          isLoading ? (
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
              {!!personMovies.cast.length && (
                <h2 className="self-start">Casting</h2>
              )}
              <div className="movie__persons flex">
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
              {!!personMovies.crew.length && (
                <h2 className="self-start">Technique</h2>
              )}
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

        {/* TV */}
        {(!!personTVs?.crew.length || !!personTVs?.cast.length) && (
          <div className="flex align-center mt-2 w-100">
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
              {!!personTVs.cast.length && (
                <h2 className="self-start">Casting</h2>
              )}
              <div className="movie__persons flex">
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
              {!!personTVs.crew.length && (
                <h2 className="self-start">Technique</h2>
              )}
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
      </div>
    </Modal>
  );
};

export default ModalPersonMovies;
