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
export {
  useMutationCreateMusicVote,
  useMutationDeleteMusicVote,
  useQueryMusicVotes,
  useQueryArtistVotes
} from './music/vote';
export {
  useQueryMusicMasterpieces,
  useMutationCreateMusicMasterpiece,
  useMutationDeleteMusicMasterpiece
} from './music/masterpiece';
export {
  useQueryMusicPlaylist,
  useMutationCreateMusicPlaylist,
  useMutationDeleteMusicPlaylist
} from './music/playlist';

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
  searchPerson,
  useQueryMovie,
  useQueryTV,
  useQueryPersonMovies,
  useQueryPersonTVs
} from './tmdb';
export {
  useMutationLogSpotify,
  useQueryArtist,
  useQueryArtistAlbums,
  useQuerySearch,
  useQueryTopTracks
} from './spotify';
