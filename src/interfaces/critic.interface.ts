export type { ICritic, IMovieCritic };

interface ICritic {
  content: string;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
  user_id: number;
  user_name: string;
}

interface IMovieCritic {
  user_id: number;
  user_name: string;
  content: string;
  vote: number;
}
