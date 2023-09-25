import { useRef, useState } from 'react';

import { IconPause, IconPlay } from '@assets/index';

import './Player.scss';

interface ITrackPlayerProps {
  url: string;
  name: string;
}

const TrackPlayer = ({ url, name }: ITrackPlayerProps) => {
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
    <div className="flex align-center gap-1">
      <audio
        ref={audioRef}
        src={url}
        autoPlay={false}
        style={{ display: 'none' }}></audio>
      <button
        onClick={handlePlayer}
        className="player__button flex align-center">
        {isPlaying ? (
          <IconPause width={32} height={32} />
        ) : (
          <IconPlay width={32} height={32} />
        )}
      </button>
      <p className="m-0 f-s">{name}</p>
    </div>
  );
};

export default TrackPlayer;
