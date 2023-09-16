import { defaultImg } from '@assets/index';

interface IMovieDescriptionProps {
  overview: string;
  poster: string;
  title: string;
  year: string;
}

const MovieDescription = ({
  overview,
  poster,
  title,
  year
}: IMovieDescriptionProps) => {
  return (
    <div className="flex-col justify-center align-center mt-5 mb-2 gap-2">
      <img
        className="movie__poster"
        src={poster ? `${import.meta.env.VITE_TMDB_IMG}/${poster}` : defaultImg}
        alt={title}
      />
      <div className="movie__details flex-col gap-2">
        <h1>{title}</h1>
        <p className="m-0">{overview}</p>
        <div className="m-0 self-end">{year.split('-')[0]}</div>
      </div>
    </div>
  );
};

export default MovieDescription;
