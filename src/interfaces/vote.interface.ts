export type { IVote, IVoteRequest, IVoteMusic, IVoteMusicRequest };

// Cinema
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

// Music
interface IVoteMusic {
  id: string;
  album_id: string;
  album_name: string;
  value: number;
  artist_id: string;
  artist_name: string;
  image_url: string;
  user: {
    id: number;
    username: string;
  };
}

interface IVoteMusicRequest {
  album_id: string;
  album_name: string;
  value: number;
  image_url: string;
  artist_name: string;
  artist_id: string;
}
