import { vinyl } from '@assets/index';
import { ResearchMusic } from '@components/index';

import './Music.scss';

const Music = () => {
  return (
    <main className="music flex-col align-center">
      <header className="cinema__header w-100">
        <img src={vinyl} alt="vinyle" />
        <div className="flex align-center">
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="my-1 px-2">Musique</h1>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
        </div>
      </header>

      <ResearchMusic />
    </main>
  );
};

export default Music;
