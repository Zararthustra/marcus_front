## Marcus

A movie & music review application built around the TMDB & Spotify APIs.

## [Changelog](./CHANGELOG.md)

## Technologies & libraries used

|Usage|Name|Version|
|-|-|-|
|Framework|React.js|18.2.0
|Builder|Vite.js|4.2.0
|Testing|Vitest|0.34.6
|Language|Typescript|4.9.3
|Style|SCSS|1.60.0
|Cache management|ReactQuery|4.28.0
|Formatter|Prettier|2.8.4
|Forms|Formik|2.2.9
|Type validation|Yup|1.0.2
|Package manager|Npm|8.19.2
|UI library|Ant Design|5.3.3
|HTTP requests|Axios|1.3.4
|Responsive rendering|React Responsive|9.0.2
|Changelog|Standard Version|9.5.0

## Architecture

```bash
src
|   App.tsx
|   main.tsx
|   setupTest.ts
|   vite-env.d.ts
|   
+---assets
|   |   index.ts
|   |
|   +---img
|   |       community.png
|   |       default_img.jpg
|   |       login.png
|   |       ...
|   |
|   \---svg
|           IconArrowRight.tsx
|           IconBurger.tsx
|           IconClap.tsx
|           ...
|
+---components
|   |   index.tsx
|   |
|   +---Button
|   |       Button.scss
|   |       Button.tsx
|   |
|   +---Cinema
|   |   +---Critics
|   |   |       Critic.scss
|   |   |       Critic.tsx
|   |   |       CriticMovie.tsx
|   |   |       Critics.tsx
|   |   |
|   |   +---Masterpieces
|   |   |       Masterpiece.scss
|   |   |       Masterpiece.tsx
|   |   |       Masterpieces.tsx
|   |   |       Watchlists.tsx
|   |   |
|   |   +---Movie
|   |   |       MovieCredits.tsx
|   |   |       MovieDescription.tsx
|   |   |       MovieProviders.tsx
|   |   |
|   |   +---MovieItem
|   |   |       MovieItem.scss
|   |   |       MovieItem.tsx
|   |   |
|   |   +---Research
|   |   |       Releases.scss
|   |   |       Releases.tsx
|   |   |       Research.scss
|   |   |       Research.tsx
|   |   |
|   |   \---Votes
|   |           Vote.scss
|   |           Vote.tsx
|   |           Votes.tsx
|   |
|   +---CommunityItem
|   |       CommunityItem.scss
|   |       CommunityItem.tsx
|   |
|   +---Footer
|   |       Footer.scss
|   |       Footer.tsx
|   |
|   +---HomeCard
|   |       HomeCard.scss
|   |       HomeCard.tsx
|   |
|   +---Modals
|   |       ModalAlbum.tsx
|   |       ModalCritic.tsx
|   |       ModalCriticDelete.tsx
|   |       ...
|   |
|   +---Music
|   |   +---Critics
|   |   |       Critic.scss
|   |   |       CriticMusic.tsx
|   |   |       MusicCritics.tsx
|   |   |
|   |   +---Masterpieces
|   |   |       Masterpiece.scss
|   |   |       Masterpiece.tsx
|   |   |       Masterpieces.tsx
|   |   |       Playlist.tsx
|   |   |
|   |   +---MusicItem
|   |   |       AlbumItem.tsx
|   |   |       ArtistItem.tsx
|   |   |       MusicItem.scss
|   |   |       TrackItem.tsx
|   |   |
|   |   +---Player
|   |   |       Player.scss
|   |   |       Player.tsx
|   |   |       TrackPlayer.tsx
|   |   |
|   |   +---Research
|   |   |       Research.scss
|   |   |       Research.tsx
|   |   |
|   |   \---Votes
|   |           Vote.scss
|   |           Vote.tsx
|   |           Votes.tsx
|   |
|   \---Sidebar
|           Sidebar.scss
|           Sidebar.tsx
|
+---interfaces
|       api.interface.ts
|       community.interface.ts
|       critic.interface.ts
|       ...
|
+---mocks
|       api.ts
|       community.ts
|       user.ts
|       ...
|
+---pages
|   |   index.tsx
|   |
|   +---Artist
|   |       Artist.scss
|   |       Artist.tsx
|   |
|   +---Cinema
|   |       Cinema.scss
|   |       Cinema.tsx
|   |
|   +---Community
|   |       Community.scss
|   |       Community.test.tsx
|   |       Community.tsx
|   |
|   +---Home
|   |       Home.scss
|   |       Home.tsx
|   |
|   +---Login
|   |       Login.scss
|   |       Login.tsx
|   |       Register.tsx
|   |
|   +---Movie
|   |       Movie.scss
|   |       Movie.tsx
|   |       TV.tsx
|   |
|   +---Music
|   |       Music.scss
|   |       Music.tsx
|   |
|   +---NotFound
|   |       NotFound.scss
|   |       NotFound.test.tsx
|   |       NotFound.tsx
|   |
|   \---UserProfile
|           UserProfile.scss
|           UserProfile.tsx
|
+---queries
|   |   axios.ts
|   |   community.test.ts
|   |   community.ts
|   |   ...
|   |
|   +---cinema
|   |       critic.ts
|   |       masterpiece.ts
|   |       vote.ts
|   |       watchlist.ts
|   |
|   \---music
|           critic.ts
|           masterpiece.ts
|           playlist.ts
|           vote.ts
|
+---services
|       AppContext.tsx
|       AppWrapper.tsx
|       localStorageService.ts
|       ScrollToTop.tsx
|
+---styles
|       animations.scss
|       base.scss
|       flexbox.scss
|       ...
|
\---utils
        formatters.test.tsx
        formatters.tsx
```

## Installation

- Clone the repo
```bash
git clone https://github.com/Zararthustra/marcus_front.git
```

- Install dependencies
```bash
npm install
```

- Run dev server
```bash
npm run dev
```

- Run tests
```bash
npm run test
```

- Build static files
```bash
npm run build
```

- Release version (click [here](https://github.com/conventional-changelog/standard-version) for more details about Standard Version)
```bash
npm run release
```

```bash
npm run release -- --release-as X.Y.Z
```