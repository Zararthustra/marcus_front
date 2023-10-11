import { Empty, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import {
  useQueryArtist,
  useQueryArtistAlbums,
  useQueryArtistCritics,
  useQueryArtistVotes,
  useQueryTopTracks
} from '@queries/index';
import {
  IconCritic,
  IconInfo,
  IconShare,
  IconVote,
  defaultImg
} from '@assets/index';
import {
  AlbumItem,
  Button,
  ModalMusicCritic,
  ModalAlbum,
  Player,
  TrackPlayer,
  CriticMusic,
  ModalMusicVote,
  MusicVote
} from '@components/index';

import './Artist.scss';
import { getLS } from '@services/localStorageService';

const Artist = () => {
  const { artistId } = useParams();
  const [isCriticizing, setIsCriticizing] = useState<boolean>(false);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const [selectedAlbum, setSelectedAlbum] = useState({
    albumId: '',
    albumName: '',
    imageUrl: ''
  });
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  const { data: artist } = useQueryArtist(artistId as string);
  const { data: topTracks } = useQueryTopTracks(artistId as string);
  const { data: albums } = useQueryArtistAlbums(artistId as string);
  const { data: critics } = useQueryArtistCritics(artistId as string);
  const { data: votes } = useQueryArtistVotes(artistId as string);

  useEffect(() => {
    if (albums && !!albums.items.length && !isMobile)
      setSelectedAlbum({
        albumId: albums.items[0].id,
        albumName: albums.items[0].name,
        imageUrl: !!albums.items[0].images[1].url
          ? albums.items[0].images[1].url
          : defaultImg
      });
  }, [albums]);

  if (!!!artist)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <div className="artist flex-col align-center">
      {!!selectedAlbum.albumId && (
        <ModalMusicCritic
          albumId={selectedAlbum.albumId}
          albumName={selectedAlbum.albumName}
          imageUrl={selectedAlbum.imageUrl}
          artistId={artistId as string}
          artistName={artist.name}
          showModal={isCriticizing}
          setShowModal={setIsCriticizing}
        />
      )}
      {!!selectedAlbum.albumId && (
        <ModalMusicVote
          albumId={selectedAlbum.albumId}
          albumName={selectedAlbum.albumName}
          imageUrl={selectedAlbum.imageUrl}
          artistId={artistId as string}
          artistName={artist.name}
          showModal={isVoting}
          setShowModal={setIsVoting}
        />
      )}

      {!!albums?.items[0] && (
        <img
          src={
            !!albums.items[0].images[0].url
              ? albums.items[0].images[0].url
              : defaultImg
          }
          alt={albums.items[0].name}
          className="artist__backdrop"
        />
      )}

      <header className="flex flex-wrap justify-evenly gap-1 w-100">
        <div className="flex-col justify-between align-center gap-2">
          <img
            className="artist__image"
            src={!!artist.images.length ? artist.images[0].url : defaultImg}
            alt={artist.name}
          />
          {!!selectedAlbum &&
            (isMobile ? (
              <ModalAlbum
                setIsCriticizing={setIsCriticizing}
                setIsVoting={setIsVoting}
                setSelectedAlbum={setSelectedAlbum}
                selectedAlbum={selectedAlbum}
                hasCriticized={
                  !!critics?.data.some(
                    (item) =>
                      item.album_id === selectedAlbum.albumId &&
                      item.user.id.toString() === getLS('userId')
                  )
                }
                hasVoted={
                  !!votes?.data.some(
                    (item) =>
                      item.album_id === selectedAlbum.albumId &&
                      item.user.id.toString() === getLS('userId')
                  )
                }
              />
            ) : (
              <>
                <Player uri={'album/' + selectedAlbum.albumId} height={400} />
                <div className="flex w-100 gap-1">
                  {!critics?.data.some(
                    (item) =>
                      item.album_id === selectedAlbum.albumId &&
                      item.user.id.toString() === getLS('userId')
                  ) && (
                    <Button
                      primary
                      className="w-100"
                      onClick={() => setIsCriticizing(true)}>
                      <IconCritic width={20} height={20} />
                      <p className="m-0">Critiquer</p>
                    </Button>
                  )}
                  {!votes?.data.some(
                    (item) =>
                      item.album_id === selectedAlbum.albumId &&
                      item.user.id.toString() === getLS('userId')
                  ) && (
                    <Button
                      primary
                      className="w-100"
                      onClick={() => setIsVoting(true)}>
                      <IconVote width={20} height={20} />
                      <p className="m-0">Voter</p>
                    </Button>
                  )}
                </div>
              </>
            ))}
        </div>

        <div className="artist__infos flex-col align-center justify-evenly gap-2">
          <div className="flex align-center w-100">
            <div
              className="w-100"
              style={{
                backgroundColor: 'var(--color-primary-700)',
                height: '2px'
              }}
            />
            <h1 className="px-1">{artist.name}</h1>
            <div
              className="w-100"
              style={{
                backgroundColor: 'var(--color-primary-700)',
                height: '2px'
              }}
            />
          </div>

          <div className="flex justify-center flex-wrap gap-05">
            {artist.genres.map((genre, index) => (
              <p key={index} className="f-xs m-0 tag--primary br-full">
                {genre}
              </p>
            ))}
          </div>

          <h2>Titres Populaires</h2>
          {!!topTracks && (
            <div className="flex-col">
              {topTracks.tracks.map((track, index) =>
                !!track.preview_url ? (
                  <TrackPlayer
                    name={track.name}
                    url={track.preview_url}
                    key={index}
                  />
                ) : (
                  <p className="m-0 f-s ml-3" key={index}>
                    {track.name}
                  </p>
                )
              )}
            </div>
          )}

          {!!navigator.share && (
            <Button
              className="w-100 px-0"
              onClick={() =>
                navigator.share({
                  text: "Voici un artiste que j'ai découvert",
                  title: artist.name,
                  url: window.location.href
                })
              }>
              <IconShare />
              Partager
            </Button>
          )}
        </div>
      </header>

      {!!albums?.items.length && (
        <Tabs
          defaultActiveKey="0"
          size="small"
          centered
          tabBarGutter={20}
          className="cinema__tabs mt-5"
          items={[
            {
              label: <h2>Albums ({albums.total})</h2>,
              key: '0',
              children: (
                <div className="flex-col align-center gap-05">
                  <div className="mb-2 mt-05 tag--info br-full flex align-center">
                    <IconInfo size={20} />
                    <p className="m-05 f-s">
                      Sélectionnez un album pour l'écouter
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-05">
                    {albums.items.map((album, index) => (
                      <AlbumItem
                        album={album}
                        key={index}
                        setSelectedAlbum={setSelectedAlbum}
                        selectedAlbum={selectedAlbum}
                      />
                    ))}
                  </div>
                </div>
              )
            },
            {
              label: <h2>Critiques ({critics?.total})</h2>,
              key: '1',
              children:
                critics && critics.total > 0 ? (
                  <div className="flex flex-wrap justify-center gap-05 mt-2 px-1">
                    {critics.data.map((critic, index) => (
                      <CriticMusic
                        key={index}
                        id={critic.id}
                        content={critic.content}
                        userId={critic.user.id}
                        userName={critic.user.username}
                        albumId={critic.album_id}
                        albumName={critic.album_name}
                        artistId={critic.artist_id}
                        artistName={critic.artist_name}
                      />
                    ))}
                  </div>
                ) : (
                  <Empty
                    className="mt-5"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
            },
            {
              label: <h2>Votes ({votes?.total})</h2>,
              key: '2',
              children:
                votes && votes.total > 0 ? (
                  <div className="flex flex-wrap justify-evenly gap-05 mt-2 px-1">
                    {votes.data.map((vote, index) => (
                      <MusicVote
                        key={index}
                        user={vote.user}
                        id={vote.id}
                        albumId={vote.album_id}
                        albumName={vote.album_name}
                        value={vote.value}
                        artistId={vote.artist_id}
                        artistName={vote.artist_name}
                        imageUrl={vote.image_url}
                      />
                    ))}
                  </div>
                ) : (
                  <Empty
                    className="mt-5"
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                  />
                )
            }
          ]}
        />
      )}
    </div>
  );
};

export default Artist;
