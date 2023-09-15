export type { IRelease, IMovieResult, ITVResults };

interface IMovieResult {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  release_date: string;
  popularity: number;
}

interface ITVResults {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  overview: string;
  first_air_date: string;
  popularity: number;
}

interface IRelease<T> {
  results: T[];
  page: number;
  total_pages: number;
  total_results: number;
}
