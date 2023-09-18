export type { IVote, IVoteRequest };

interface IVote {
  value: number;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
  user_id: number;
  user_name: string;
}

interface IVoteRequest {
  value: number;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
}
