export type {
  IMasterpiece,
  IMovieDetails,
  IMasterpieceRequest,
  IMasterpieceMusic,
  IMasterpieceMusicRequest
};

//Cinema
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
  tags: string;
}

interface IMasterpieceRequest {
  movie_id: number;
  movie_name: string;
  platform: 'tv' | 'movie';
  tags: string;
}

// Music
interface IMasterpieceMusic {
  id: string;
  album_id: string;
  album_name: string;
  artist_id: string;
  artist_name: string;
  image_url: string;
  user: {
    id: number;
    username: string;
  };
}

interface IMasterpieceMusicRequest {
  album_id: string;
  album_name: string;
  image_url: string;
  artist_name: string;
  artist_id: string;
}
