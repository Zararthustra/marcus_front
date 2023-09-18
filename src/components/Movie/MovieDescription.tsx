import { useEffect, useState } from 'react';

import {
  useMutationAddMasterpiece,
  useMutationAddWatchlist,
  useMutationDelMasterpiece,
  useMutationDelWatchlist
} from '@queries/index';
import { Button } from '@components/index';
import { IMasterpiece } from '@interfaces/index';
import { IconMasterpiece, IconWatchlist, defaultImg } from '@assets/index';

interface IMovieDescriptionProps {
  overview: string;
  poster: string;
  movieId: number;
  userName: string;
  title: string;
  year: string;
  platform: 'tv' | 'movie';
  masterpieces?: IMasterpiece[];
  watchlists?: IMasterpiece[];
}

const MovieDescription = ({
  overview,
  poster,
  movieId,
  userName,
  title,
  year,
  platform,
  masterpieces,
  watchlists
}: IMovieDescriptionProps) => {
  // Watchlist
  const [addedWatchlist, setAddedWatchlist] = useState<boolean>(false);
  const { mutate: addWatchlist } = useMutationAddWatchlist();
  const { mutate: delWatchlist } = useMutationDelWatchlist();
  useEffect(() => {
    if (!!watchlists)
      setAddedWatchlist(
        watchlists.some(
          (item) => item.user_name === userName && item.movie_id === movieId
        )
      );
  }, [watchlists]);
  const handleWatchlists = () => {
    if (addedWatchlist) {
      delWatchlist(movieId);
      setAddedWatchlist(false);
    } else {
      addWatchlist({
        movie_id: movieId,
        movie_name: title,
        platform: platform
      });
      setAddedWatchlist(true);
    }
  };

  // Masterpiece
  const [addedMasterpiece, setAddedMasterpiece] = useState<boolean>(false);
  const { mutate: addMasterpiece } = useMutationAddMasterpiece();
  const { mutate: delMasterpiece } = useMutationDelMasterpiece();
  useEffect(() => {
    if (!!masterpieces)
      setAddedMasterpiece(
        masterpieces.some(
          (item) => item.user_name === userName && item.movie_id === movieId
        )
      );
  }, [masterpieces]);
  const handleMasterpieces = () => {
    if (addedMasterpiece) {
      delMasterpiece(movieId);
      setAddedMasterpiece(false);
    } else {
      addMasterpiece({
        movie_id: movieId,
        movie_name: title,
        platform: platform
      });
      setAddedMasterpiece(true);
    }
  };

  return (
    <div className="flex-col justify-center align-center mt-5 mb-2 gap-2">
      <img
        className="movie__poster"
        src={poster ? `${import.meta.env.VITE_TMDB_IMG}/${poster}` : defaultImg}
        alt={title}
      />

      <div className="movie__details flex-col gap-2">
        <div className="flex flex-wrap gap-2 w-100 justify-between align-center">
          <h1>{title}</h1>
          <div className="flex gap-05">
            <Button
              onClick={handleMasterpieces}
              className={`movie__button ${
                addedMasterpiece ? '' : 'movie__button--add'
              }`}>
              <IconMasterpiece width={20} height={20} />
            </Button>
            <Button
              onClick={handleWatchlists}
              className={`movie__button ${
                addedWatchlist ? '' : 'movie__button--add'
              }`}>
              <IconWatchlist width={20} height={20} />
            </Button>
          </div>
        </div>

        <p className="m-0">{overview}</p>
        <div className="m-0 self-end">{year.split('-')[0]}</div>
      </div>
    </div>
  );
};

export default MovieDescription;
