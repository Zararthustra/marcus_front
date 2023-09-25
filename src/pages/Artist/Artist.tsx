import { Empty } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import {
  useQueryArtist,
  useQueryArtistAlbums,
  useQueryTopTracks
} from '@queries/index';
import { IconShare, defaultImg } from '@assets/index';
import {
  AlbumItem,
  Button,
  ModalPlayer,
  Player,
  TrackPlayer
} from '@components/index';

import './Artist.scss';

const Artist = () => {
  const { artistId } = useParams();
  const [selectedAlbum, setSelectedAlbum] = useState<string>('');
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  const { data: artist } = useQueryArtist(artistId as string);
  const { data: topTracks } = useQueryTopTracks(artistId as string);
  const { data: albums } = useQueryArtistAlbums(artistId as string);

  useEffect(() => {
    if (albums && !!albums.items.length && !isMobile)
      setSelectedAlbum(albums.items[0].id);
  }, [albums]);

  if (!!!artist)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <div className="artist flex-col align-center">
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
              <ModalPlayer
                setShowModal={setSelectedAlbum}
                showModal={!!selectedAlbum}
                uri={'album/' + selectedAlbum}
              />
            ) : (
              <Player uri={'album/' + selectedAlbum} height={400} />
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

      {!!albums?.items.length && <h2 className="my-2">Albums</h2>}
      {!!albums?.items.length && (
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
      )}
    </div>
  );
};

export default Artist;
