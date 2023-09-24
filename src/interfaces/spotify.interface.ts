export type { ISearchArtist, ISearchTrack };

interface ISearchArtist {
  artists: {
    items: {
      genres: string[];
      id: string;
      name: string;
      popularity: number;
      images: {
        url: string;
      }[];
    }[];
    total: number;
    limit: number;
    offset: number;
  };
}

interface ISearchTrack {
  tracks: {
    items: {
      preview_url: string | null;
      id: string;
      name: string;
      popularity: number;
      album: {
        id: string;
        images: {
          url: string;
        }[];
        name: string;
        release_date: string;
        total_tracks: number;
      };
      artists: {
        id: string;
        name: string;
      }[];
    }[];
    total: number;
    limit: number;
    offset: number;
  };
}
