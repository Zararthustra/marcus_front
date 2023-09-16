export type { IMasterpiece, IMovieDetails };

interface IMovieDetails {
  poster_path: string;
  backdrop_path: string;
  released_date: string;
  synopsis: string;
  director?: string;
}

interface IMasterpiece {
  movie_details: IMovieDetails;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
  user_id: number;
  user_name: string;
}
