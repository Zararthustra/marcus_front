export type {
  ISearchArtist,
  ISearchTrack,
  ISpotifyPagination,
  IArtist,
  IAlbum,
  ITrack
};

interface ISpotifyPagination<T> {
  items: T;
  total: number;
  limit: number;
  offset: number;
}

interface IArtist {
  name: string;
  id: string;
  images: {
    url: string;
  }[];
  genres: string[];
}
interface ISearchArtist {
  artists: ISpotifyPagination<IArtist[]>;
}

interface IAlbum {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  artists: {
    id: string;
    name: string;
  }[];
  release_date: string;
  total_tracks: number;
}

interface ITrack {
  preview_url: string | null;
  id: string;
  name: string;
  popularity: number;
  album: IAlbum;
  artists: {
    id: string;
    name: string;
  }[];
}
interface ISearchTrack {
  tracks: ISpotifyPagination<ITrack[]>;
}
