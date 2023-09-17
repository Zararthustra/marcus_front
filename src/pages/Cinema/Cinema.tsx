import { Tabs } from 'antd';
import { useState } from 'react';

import {
  IconCritic,
  IconMasterpiece,
  IconSearchMovies,
  IconVote,
  seats
} from '@assets/index';
import { Critics, Masterpieces, Research, Votes } from '@components/index';

import './Cinema.scss';

const Cinema = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const tabs = [IconSearchMovies, IconCritic, IconVote, IconMasterpiece];

  return (
    <main className="cinema pb-5">
      <header className="cinema__header">
        <img src={seats} alt="sièges de cinéma" />
        <div className="flex align-center">
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="my-1 px-2">Cinéma</h1>
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
                {index === 0 && <Research />}
                {index === 1 && <Critics />}
                {index === 2 && <Votes />}
                {index === 3 && <Masterpieces />}
              </div>
            )
          }))}
        />
      </div>
    </main>
  );
};

export default Cinema;
