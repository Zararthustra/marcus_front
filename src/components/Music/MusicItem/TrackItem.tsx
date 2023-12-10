import { useRef, useState } from 'react';

import { IconPause, IconPlay, defaultImg } from '@assets/index';

import './MusicItem.scss';

interface ITrackItemProps {
  name: string;
  preview_url: string | null;
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
}

const TrackItem = ({ name, preview_url, album, artists }: ITrackItemProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlayer = () => {
    if (!!audioRef.current && !isPlaying) {
      setIsPlaying(true);
      audioRef.current.play();
    }
    if (!!audioRef.current && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    }
  };

  return (
    <div className="musicItem trackItem flex align-center gap-1 px-1">
      <img
        src={!!album.images.length ? album.images[2].url : defaultImg}
        alt={name}
      />

      <div className="flex-col w-100">
        <h3>{name}</h3>
        <p className="musicItem__album f-xs">{album.name}</p>
        <div className="musicItem__authors flex flex-wrap">
          {artists.map((artist) => (
            <a
              className="m-0 f-xs mr-05 f-b"
              key={artist.id}
              href={`/musique/${artist.id}`}>
              {artist.name}
            </a>
          ))}
        </div>
      </div>

      {!!preview_url && (
        <>
          <audio
            ref={audioRef}
            src={preview_url}
            onEnded={() => setIsPlaying(false)}
            autoPlay={false}></audio>
          <button
            onClick={handlePlayer}
            className="musicItem__button flex align-center">
            {isPlaying ? (
              <IconPause width={50} height={50} />
            ) : (
              <IconPlay width={50} height={50} />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default TrackItem;
