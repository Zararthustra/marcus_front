import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  IconCritic,
  IconMasterpiece,
  IconSearchMovies,
  IconVote,
  IconWatchlist,
  defaultImg
} from '@assets/index';
import {
  useMutationAddMasterpiece,
  useMutationAddWatchlist,
  useMutationDelMasterpiece,
  useMutationDelWatchlist
} from '@queries/index';
import { Button } from '@components/index';
import { IMasterpiece } from '@interfaces/index';

interface IMovieDescriptionProps {
  overview: string;
  poster: string;
  movieId: number;
  userName: string;
  title: string;
  year: string;
  platform: 'tv' | 'movie';
  seasons?: number;
  episodes?: number;
  genres: { name: string }[];
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
  watchlists,
  seasons,
  episodes,
  genres
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

      <Breadcrumb
        separator=""
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
            title: platform === 'movie' ? 'Films' : 'Séries'
          },
          {
            type: 'separator',
            separator: '/'
          },
          {
            title: title
          }
        ]}
      />

      <div className="movie__details flex-col gap-2">
        <div>
          <div className="flex flex-wrap gap-05 w-100 justify-between align-center">
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
          {(!!seasons || !!episodes) && (
            <div className="flex gap-05 mt-05">
              {!!seasons && (
                <div
                  className="tag--info br-full"
                  style={{ whiteSpace: 'nowrap' }}>
                  {seasons} {seasons > 1 ? 'saisons' : 'saison'}
                </div>
              )}
              {!!episodes && (
                <div
                  className="tag--info br-full"
                  style={{ whiteSpace: 'nowrap' }}>
                  {episodes} {episodes > 1 ? 'épisodes' : 'épisode'}
                </div>
              )}
            </div>
          )}
          {!!genres.length && (
            <div className="flex flex-wrap gap-05 mt-05">
              {genres.map((genre, index) => (
                <div
                  key={index}
                  className="tag--primary f-xs br-full"
                  style={{ whiteSpace: 'nowrap' }}>
                  {genre.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="m-0">{overview}</p>
        <div className="m-0 self-end">{year.split('-')[0]}</div>
      </div>
    </div>
  );
};

export default MovieDescription;
