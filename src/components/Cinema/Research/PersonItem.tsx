import { useNavigate } from 'react-router-dom';

import { defaultImg } from '@assets/index';
import { IPersonSearch } from '@interfaces/index';
import { getPlatformUri, handleRole } from '@utils/formatters';

interface IPersonItemProps {
  person: IPersonSearch;
}

const PersonItem = ({ person }: IPersonItemProps) => {
  const navigate = useNavigate();
  const handleMovieLink = (mediaType: 'movie' | 'tv', id: number) => {
    navigate(`/cinema/${getPlatformUri(mediaType)}/${id}`);
  };

  return (
    <article className="research__person">
      <div
        className="research__person__header flex gap-1 items-center"
        style={{
          width: '17rem'
        }}
        onClick={() => navigate(`/cinema/personnes/${person.id}`)}>
        <img
          className="research__person__img"
          src={
            person.profile_path
              ? `${import.meta.env.VITE_TMDB_IMG}/${person.profile_path}`
              : defaultImg
          }
          alt={person.name}
        />

        <div className="research__person__details">
          <p className="f-b m-0">{person.name}</p>
          <p className="mt-0">{handleRole(person.known_for_department)}</p>
        </div>
      </div>

      <div className="flex gap-1">
        {person.known_for.map((movie, index) => (
          <div
            key={index}
            className="research__person__details__movie"
            onClick={() => handleMovieLink(movie.media_type, movie.id)}>
            <img
              src={
                movie.poster_path
                  ? `${import.meta.env.VITE_TMDB_IMG}/${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.name || movie.title}
            />
            <p
              style={{
                width: '5rem',
                fontSize: '0.8rem',
                lineHeight: '12px'
              }}
              className="m-0">
              {movie.name || movie.title}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
};

export default PersonItem;
