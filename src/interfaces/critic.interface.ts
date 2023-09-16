export type { ICritic };

interface ICritic {
  content: string;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
  user_id: number;
  user_name: string;
}
