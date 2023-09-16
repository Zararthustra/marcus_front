import { useNavigate } from 'react-router-dom';

import {
  useQueryAmazon,
  useQueryCinema,
  useQueryDisney,
  useQueryNetflix
} from '@queries/index';
import { IconClapLoader } from '@assets/index';

import './Releases.scss';

const Releases = () => {
  const navigate = useNavigate();
  const { data: cinema, isLoading: cinemaLoading } = useQueryCinema();
  const { data: netflix, isLoading: netflixLoading } = useQueryNetflix();
  const { data: disney, isLoading: disneyLoading } = useQueryDisney();
  const { data: amazon, isLoading: amazonLoading } = useQueryAmazon();

  if (cinemaLoading || netflixLoading || disneyLoading || amazonLoading)
    return (
      <IconClapLoader width={100} height={100} className="loader-cinema" />
    );

  if (!!!cinema || !!!netflix || !!!disney || !!!amazon)
    return <div>Une erreur est survenue</div>;

  return (
    <div className="releases flex-col justify-center gap-2">
      {/* Cinema */}
      <div>
        <h1 className="ml-1 mb-1">Cinéma</h1>
        <div className="releases__list flex flex-wrap gap-1 justify-center">
          {cinema.results.map((movie, index) => (
            <div
              key={index}
              onClick={() => navigate(`/cinema/films/${movie.id}`)}
              className="flex-col align-center">
              <img
                className="releases__poster"
                src={`${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`}
                alt={movie.title}
              />
              <p className="releases__movie-title">{movie.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Netflix */}
      <div>
        <h1 className="ml-1 mb-1">Netflix</h1>
        <div className="releases__list flex flex-wrap gap-1 justify-center">
          {netflix.results.map((movie, index) => (
            <div
              key={index}
              onClick={() => navigate(`/cinema/series/${movie.id}`)}
              className="flex-col align-center">
              <img
                className="releases__poster"
                src={`${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`}
                alt={movie.name}
              />
              <p className="releases__movie-title">{movie.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disney */}
      <div>
        <h1 className="ml-1 mb-1">Disney +</h1>
        <div className="releases__list flex flex-wrap gap-1 justify-center">
          {disney.results.map((movie, index) => (
            <div
              key={index}
              onClick={() => navigate(`/cinema/series/${movie.id}`)}
              className="flex-col align-center">
              <img
                className="releases__poster"
                src={`${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`}
                alt={movie.name}
              />
              <p className="releases__movie-title">{movie.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Amazon */}
      <div>
        <h1 className="ml-1 mb-1">Prime Video</h1>
        <div className="releases__list flex flex-wrap gap-1 justify-center">
          {amazon.results.map((movie, index) => (
            <div
              key={index}
              onClick={() => navigate(`/cinema/series/${movie.id}`)}
              className="flex-col align-center">
              <img
                className="releases__poster"
                src={`${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`}
                alt={movie.name}
              />
              <p className="releases__movie-title">{movie.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Releases;
