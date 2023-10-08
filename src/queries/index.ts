// Cinema
export {
  useQueryCritics,
  useQueryMovieCritics,
  useMutationCreateCritic,
  useMutationDeleteCritic
} from './cinema/critic';
export {
  useQueryVotes,
  useMutationCreateVote,
  useMutationDeleteVote
} from './cinema/vote';
export {
  useQueryMasterpieces,
  useMutationAddMasterpiece,
  useMutationDelMasterpiece
} from './cinema/masterpiece';
export {
  useQueryWatchlists,
  useMutationAddWatchlist,
  useMutationDelWatchlist
} from './cinema/watchlist';

// Music
export {
  useMutationCreateAlbumCritic,
  useMutationDeleteMusicCritic,
  useQueryMusicCritics,
  useQueryArtistCritics
} from './music/critic';

// Others
export { useQueryCommunity } from './community';
export { useQueryUser } from './user';
export {
  useMutationLogin,
  useMutationReconnect,
  useMutationRegister
} from './login';

// APIs
export {
  useQueryCinema,
  useQueryNetflix,
  useQueryDisney,
  useQueryAmazon,
  searchMovie,
  searchTv,
  useQueryMovie,
  useQueryTV
} from './tmdb';
export {
  useMutationLogSpotify,
  useQueryArtist,
  useQueryArtistAlbums,
  useQuerySearch,
  useQueryTopTracks
} from './spotify';
