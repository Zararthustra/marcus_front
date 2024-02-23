import { useState } from 'react';
import { App, Input, Select, Space } from 'antd';

import {
  IMovieResult,
  IPersonSearch,
  IRelease,
  ITVResults
} from '@interfaces/index';
import { messageObject } from '@utils/formatters';
import { MovieItem, Person, Releases } from '@components/index';
import { searchMovie, searchPerson, searchTv } from '@queries/index';

import './Research.scss';

interface IMovieItem extends IMovieResult, ITVResults {}

const Research = () => {
  const { message } = App.useApp();
  const [searchType, setSearchType] = useState<'movie' | 'tv' | 'person'>(
    'movie'
  );
  const [input, setInput] = useState<string>('');
  const [movies, setMovies] = useState<IRelease<Partial<IMovieItem>>>();
  const [persons, setPersons] = useState<IRelease<IPersonSearch>>();
  const { Search } = Input;
  const options = [
    {
      value: 'movie',
      label: 'Film'
    },
    {
      value: 'tv',
      label: 'Série'
    },
    {
      value: 'person',
      label: 'Personne'
    }
  ];

  const movieSearch = async () => {
    if (input === '') {
      message.info(messageObject('info', "Entrez le nom d'un film"));
      return;
    }
    const response = await searchMovie(input);
    setMovies(response);
  };

  const tvSearch = async () => {
    if (input === '') {
      message.info(messageObject('info', "Entrez le nom d'une série"));
      return;
    }
    const response = await searchTv(input);
    setMovies(response);
  };

  const personSearch = async () => {
    if (input === '') {
      message.info(messageObject('info', "Entrez le nom d'une personne"));
      return;
    }
    const response = await searchPerson(input);
    setPersons(response);
  };

  const handleSearch = () => {
    switch (searchType) {
      case 'movie':
        movieSearch();
        break;
      case 'tv':
        tvSearch();
        break;
      case 'person':
        personSearch();
        break;

      default:
        break;
    }
  };

  return (
    <div className="research flex-col align-center gap-2 w-100">
      {/* Searchbar */}
      <Space.Compact>
        <Select
          style={{ height: '100%' }}
          defaultValue="movie"
          options={options}
          onChange={(type: 'movie' | 'tv' | 'person') => {
            // Reset movies state for UX
            setMovies({
              results: [],
              page: 1,
              total_pages: 1,
              total_results: 0
            });
            setSearchType(type);
          }}
        />
        <Search
          id="search"
          placeholder={
            'Rechercher ' +
            (searchType === 'movie'
              ? 'un film'
              : searchType === 'tv'
              ? 'une série'
              : 'une personne')
          }
          value={input}
          allowClear
          onChange={(e) => setInput(e.currentTarget.value)}
          enterButton
          onSearch={handleSearch}
        />
      </Space.Compact>

      {/* Releases */}
      {!!!input && <Releases />}

      {/* Movies search */}
      {['movie', 'tv'].includes(searchType) &&
        !!movies &&
        !!input &&
        !!movies.total_results &&
        movies.results
          .sort((p1, p2) => {
            if (!!p1.popularity && !!p2.popularity) {
              if (p1.popularity < p2.popularity) return 1;
              if (p1.popularity > p2.popularity) return -1;
            }
            return 0;
          })
          .map((movie, index) => <MovieItem key={index} movie={movie} />)}

      {/* Persons search */}
      {searchType === 'person' && (
        <div className="flex flex-wrap gap-3 justify-center">
          {!!persons &&
            !!input &&
            !!persons.total_results &&
            persons.results
              .sort((p1, p2) => {
                if (!!p1.popularity && !!p2.popularity) {
                  if (p1.popularity < p2.popularity) return 1;
                  if (p1.popularity > p2.popularity) return -1;
                }
                return 0;
              })
              .map((person, index) => <Person key={index} person={person} />)}
        </div>
      )}
    </div>
  );
};

export default Research;
