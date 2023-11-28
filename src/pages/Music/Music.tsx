import { Tabs } from 'antd';
import { useState } from 'react';

import {
  IconCritic,
  IconMasterpiece,
  IconSearchMusic,
  vinyl,
  IconVote
} from '@assets/index';
import {
  MusicCritics,
  MusicMasterpieces,
  MusicVotes,
  ResearchMusic
} from '@components/index';

import './Music.scss';

const Music = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const tabs = [IconSearchMusic, IconCritic, IconVote, IconMasterpiece];

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

      <div className="w-100 flex justify-center px-1">
        <Tabs
          defaultActiveKey="0"
          size="small"
          centered
          tabBarGutter={20}
          className="cinema__tabs"
          onChange={(key) => {
            setActiveKey(parseInt(key));
          }}
          items={tabs.map((Tab, index) => ({
            label: (
              <Tab
                color={
                  activeKey === index
                    ? 'var(--color-primary-700)'
                    : 'var(--color-grey-400)'
                }
              />
            ),
            key: index.toString(),
            children: (
              <div className="flex-col align-center">
                {index === 0 && <ResearchMusic />}
                {index === 1 && <MusicCritics />}
                {index === 2 && <MusicVotes />}
                {index === 3 && <MusicMasterpieces />}
              </div>
            )
          }))}
        />
      </div>
    </main>
  );
};

export default Music;
