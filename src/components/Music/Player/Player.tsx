import './Player.scss';

interface IPlayerProps {
  uri: string;
}

const Player = ({ uri }: IPlayerProps) => {
  return (
    <div className="player">
      <iframe
        src={`https://open.spotify.com/embed/${uri}?utm_source=generator`}
        height="155"
        frameBorder={0}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
};

export default Player;
