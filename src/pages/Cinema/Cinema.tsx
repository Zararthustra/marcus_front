import { Tabs } from 'antd';
import { useState } from 'react';

import {
  IconCritic,
  IconMasterpiece,
  IconSearchMovies,
  IconVote,
  seats
} from '@assets/index';
import { Critics } from '@components/index';

import './Cinema.scss';

const Cinema = () => {
  const [activeKey, setActiveKey] = useState<number>(0);
  const tabs = [
    {
      title: <h1 className="mb-2">Recherche</h1>,
      icon: IconSearchMovies
    },
    {
      title: <h1 className="mb-2">Critiques</h1>,
      icon: IconCritic
    },
    {
      title: <h1 className="mb-2">Votes</h1>,
      icon: IconVote
    },
    {
      title: <h1 className="mb-2">Chefs d'oeuvres</h1>,
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
          className="cinema__tabs"
          onChange={(key) => {
            setActiveKey(parseInt(key));
          }}
          items={tabs.map((tab, index) => ({
            label: (
              <tab.icon
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
                {tab.title}
                {index === 1 && <Critics />}
              </div>
            )
          }))}
        />
      </div>
    </main>
  );
};

export default Cinema;
