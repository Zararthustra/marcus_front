import { useState } from 'react';
import { Empty, Input } from 'antd';

import { IconSearch } from '@assets/index';
import { searchMovie, searchTv } from '@queries/index';
import { MovieItem, Releases } from '@components/index';
import { IMovieResult, IRelease, ITVResults } from '@interfaces/index';

import './Research.scss';

interface IMovieItem extends IMovieResult, ITVResults {}

const Research = () => {
  const [input, setInput] = useState<string>('');
  const [movies, setMovies] = useState<IRelease<Partial<IMovieItem>>>();

  const movieSearch = async () => {
    if (input === '') return;
    const response = await searchMovie(input);
    setMovies(response);
  };

  const tvSearch = async () => {
    if (input === '') return;
    const response = await searchTv(input);
    setMovies(response);
  };

  return (
    <div className="research flex-col align-center gap-2 w-100">
      {/* Searchbar */}
      <div className="research__input flex-col align-center mt-1 mb-2">
        <Input
          id="searchmovie"
          placeholder="Game of thrones, Matrix reloaded, ..."
          value={input}
          style={{ borderRadius: '3px 3px 0 0' }}
          suffix={<IconSearch color="var(--color-grey-400)" />}
          allowClear
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <div className="flex w-100">
          <button
            className="research__button research__button--movie"
            onClick={movieSearch}>
            Chercher un film
          </button>
          <button
            className="research__button research__button--tv"
            onClick={tvSearch}>
            Chercher une série
          </button>
        </div>
      </div>

      {/* Releases */}
      {!!!input && <Releases />}

      {/* Movies search */}
      {!!movies && !!input && !!movies.total_results ? (
        movies.results
          .sort((p1, p2) => {
            if (!!p1.popularity && !!p2.popularity) {
              if (p1.popularity < p2.popularity) return 1;
              if (p1.popularity > p2.popularity) return -1;
            }
            return 0;
          })
          .map((movie, index) => <MovieItem key={index} movie={movie} />)
      ) : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default Research;
