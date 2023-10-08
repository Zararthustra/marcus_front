export type {
  ICritic,
  IMovieCritic,
  ICriticRequest,
  ICriticMusic,
  ICriticMusicRequest
};

// Cinema
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

interface ICriticRequest {
  content: string;
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
}

// Music
interface ICriticMusic {
  id: string;
  album_id: string;
  album_name: string;
  content: string;
  artist_id: string;
  artist_name: string;
  image_url: string;
  user: {
    id: number;
    username: string;
  };
}

interface ICriticMusicRequest {
  album_id: string;
  album_name: string;
  content: string;
  image_url: string;
  artist_name: string;
  artist_id: string;
}
