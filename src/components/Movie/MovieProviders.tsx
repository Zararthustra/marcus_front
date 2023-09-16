import { defaultImg } from '@assets/index';

interface IMovieProvidersProps {
  flatrate?: { logo_path: string; provider_name: string }[];
  rent?: { logo_path: string; provider_name: string }[];
  buy?: { logo_path: string; provider_name: string }[];
}

const MovieProviders = ({ flatrate, rent, buy }: IMovieProvidersProps) => (
  <div className="movie__providers my-2">
    {/* Flatrate */}
    {!!flatrate && <h3>À voir sur</h3>}
    {!!flatrate && (
      <div className="flex flex-wrap gap-05 my-05">
        {flatrate.map((item, index) => (
          <img
            className="movie__provider"
            key={index}
            src={
              !!item.logo_path
                ? `${import.meta.env.VITE_TMDB_IMG}/${item.logo_path}`
                : defaultImg
            }
            alt={item.provider_name}
          />
        ))}
      </div>
    )}

    {/* Rent */}
    {!!rent && <h3>À louer sur</h3>}
    {!!rent && (
      <div className="flex flex-wrap gap-05 my-05">
        {rent.map((item, index) => (
          <img
            className="movie__provider"
            key={index}
            src={
              !!item.logo_path
                ? `${import.meta.env.VITE_TMDB_IMG}/${item.logo_path}`
                : defaultImg
            }
            alt={item.provider_name}
          />
        ))}
      </div>
    )}

    {/* Buy */}
    {!!buy && <h3>À acheter sur</h3>}
    {!!buy && (
      <div className="flex flex-wrap gap-05 my-05">
        {buy.map((item, index) => (
          <img
            className="movie__provider"
            key={index}
            src={
              !!item.logo_path
                ? `${import.meta.env.VITE_TMDB_IMG}/${item.logo_path}`
                : defaultImg
            }
            alt={item.provider_name}
          />
        ))}
      </div>
    )}
  </div>
);

export default MovieProviders;
