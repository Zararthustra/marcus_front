import { useState } from 'react';
import { Empty, Tabs } from 'antd';
import { useParams } from 'react-router-dom';

import {
  IconClapLoader,
  IconCritic,
  IconMasterpiece,
  IconVote,
  IconWatchlist,
  projector
} from '@assets/index';
import { useQueryUser } from '@queries/index';
import { capitalizeFirstLetter } from '@utils/formatters';
import { Critics, Masterpieces, Votes, Watchlists } from '@components/index';

import './UserProfile.scss';

const UserProfile = () => {
  const uriParams = useParams();
  const userId = parseInt(uriParams.userId as string);
  const [activeKey, setActiveKey] = useState<number>(0);
  const tabs = [IconCritic, IconVote, IconMasterpiece, IconWatchlist];

  const { data: user, isLoading } = useQueryUser(userId);
  console.log(user);

  if (isLoading)
    return (
      <div className="UserProfile flex-col align-center mt-5 gap-2">
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!user)
    return (
      <div className="UserProfile flex-col align-center mt-5 gap-2">
        <h1>Utilisateur inconnu !</h1>
        <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <main className="UserProfile">
      <header className="UserProfile__header">
        <img src={projector} alt="projecteur" />
        <div className="flex align-center">
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="my-1 px-2">{capitalizeFirstLetter(user.username)}</h1>
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
          className="UserProfile__tabs"
          onChange={(key) => {
            setActiveKey(parseInt(key));
          }}
          items={tabs.map((Tab, index) => ({
            label: (
              <div className="flex-col align-center gap-05">
                <Tab
                  color={
                    activeKey === index
                      ? 'var(--color-primary-700)'
                      : 'var(--color-grey-400)'
                  }
                />
                {index === 0 && user.user_critics}
                {index === 1 && user.user_votes}
                {index === 2 && user.user_masterpieces}
                {index === 3 && user.user_watchlists}
              </div>
            ),
            key: index.toString(),
            children: (
              <div className="flex-col align-center">
                {index === 0 && <Critics user={userId} />}
                {index === 1 && <Votes user={userId} />}
                {index === 2 && <Masterpieces user={userId} />}
                {index === 3 && <Watchlists user={userId} />}
              </div>
            )
          }))}
        />
      </div>
    </main>
  );
};

export default UserProfile;
