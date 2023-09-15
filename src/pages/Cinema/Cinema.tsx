import { Tabs } from 'antd';
import { useState } from 'react';

import {
  IconCritic,
  IconMasterpiece,
  IconSearchMovies,
  IconVote,
  seats
} from '@assets/index';
import { Critics, Masterpieces, Votes } from '@components/index';

import './Cinema.scss';

const Cinema = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const tabs = [
    {
      name: 'Recherche',
      icon: IconSearchMovies
    },
    {
      name: 'Critiques',
      icon: IconCritic
    },
    {
      name: 'Votes',
      icon: IconVote
    },
    {
      name: "Chefs d'oeuvres",
      icon: IconMasterpiece
    }
  ];
  return (
    <main className="cinema pb-5">
      <header className="cinema__header">
        <img src={seats} alt="sièges de cinéma" />
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
          items={tabs.map((tab, index) => ({
            label: (
              <div
                className="flex-col align-center justify-end "
                style={{ height: '3.5rem' }}>
                <tab.icon
                  color={
                    activeKey === index
                      ? 'var(--color-primary-700)'
                      : 'var(--color-grey-400)'
                  }
                />
                <p className="m-0 f-xs">{tab.name}</p>
              </div>
            ),
            key: index.toString(),
            children: (
              <div className="flex-col align-center">
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
