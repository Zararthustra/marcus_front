import { useState } from 'react';
import { App, Empty, Input } from 'antd';

import { IconSearch } from '@assets/index';
import { useQuerySearch } from '@queries/index';
import { messageObject } from '@utils/formatters';
import { ArtistItem, Player, TrackItem } from '@components/index';

import './Research.scss';

interface IResearchProps {}
const Research = ({}: IResearchProps) => {
  const { message } = App.useApp();
  const [input, setInput] = useState<string>('');
  const [type, setType] = useState<'artist' | 'track'>();
  const { data: results } = useQuerySearch(input, type);

  const artistSearch = async () => {
    if (input === '') {
      message.info(messageObject('info', "Entrez le nom d'un artiste"));
      return;
    }
    setType('artist');
  };
  const trackSearch = async () => {
    if (input === '') {
      message.info(messageObject('info', "Entrez le nom d'un morceau"));
      return;
    }
    setType('track');
  };

  return (
    <div className="research flex-col align-center gap-2 w-100">
      {/* Searchbar */}
      <div className="research__input flex-col align-center mt-1 mb-2">
        <Input
          id="searchmusic"
          placeholder="Pink Floyd, Allumer le feu..."
          value={input}
          style={{ borderRadius: '3px 3px 0 0' }}
          suffix={<IconSearch color="var(--color-grey-400)" />}
          allowClear
          onChange={(e) => setInput(e.currentTarget.value)}
        />
        <div className="flex w-100">
          <button
            className="research__button research__button--artist"
            onClick={artistSearch}>
            Chercher un artiste
          </button>
          <button
            className="research__button research__button--track"
            onClick={trackSearch}>
            Chercher un titre
          </button>
        </div>
      </div>

      {!!input ? (
        !!results ? (
          <div className="research__items flex-col gap-1">
            {'artists' in results &&
              results.artists.items.map((item) => (
                <ArtistItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  images={item.images}
                  genres={item.genres}
                />
              ))}
            {'tracks' in results &&
              results.tracks.items.map((item) => (
                <TrackItem
                  key={item.id}
                  name={item.name}
                  preview_url={item.preview_url}
                  artists={item.artists}
                  album={item.album}
                />
              ))}
          </div>
        ) : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        )
      ) : (
        <div className="flex flex-wrap gap-05 justify-center w-100 px-1">
          <Player uri="playlist/37i9dQZF1DWZLN2cXno63R" />
          <Player uri="playlist/37i9dQZF1DX8685vIIepKh" />
          <Player uri="playlist/37i9dQZF1DWXTHBOfJ8aI7" />
          <Player uri="playlist/37i9dQZF1DX42c5TkSUfEb" />
          <Player uri="playlist/37i9dQZF1DX39mId53VASc" />
        </div>
      )}
    </div>
  );
};

export default Research;
