export type {
  IRelease,
  IMovieResult,
  ITVResults,
  ICast,
  ICrew,
  IPersonMovies,
  IPersonTVs
};

interface ICast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
  popularity: number;
}
interface ICrew {
  id: number;
  name: string;
  job: string;
  profile_path: string;
  popularity: number;
}

interface IWatchProviders {
  results: {
    FR: {
      flatrate: { logo_path: string; provider_name: string }[];
      rent: { logo_path: string; provider_name: string }[];
      buy: { logo_path: string; provider_name: string }[];
    };
  };
}

interface IMovieResult {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  credits: { cast: ICast[]; crew: ICrew[] };
  videos: {
    results: {
      key: string;
    }[];
  };
  'watch/providers': IWatchProviders;
}

interface ITVResults {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  popularity: number;
  credits: { cast: ICast[]; crew: ICrew[] };
  videos: {
    results: {
      key: string;
    }[];
  };
  'watch/providers': IWatchProviders;
}

interface IRelease<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface IPersonMovie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
  // Cast or Crew
  character?: string;
  job?: string;
}
interface IPersonMovies {
  id: number;
  cast: IPersonMovie[];
  crew: IPersonMovie[];
}

interface IPersonTV {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  popularity: number;
  // Cast or Crew
  character?: string;
  job?: string;
}
interface IPersonTVs {
  id: number;
  cast: IPersonTV[];
  crew: IPersonTV[];
}
