import { Empty } from 'antd';

import { CommunityItem } from '@components/index';
import { useQueryCommunity } from '@queries/index';
import { IconClapLoader, community } from '@assets/index';

import './Community.scss';

const Community = () => {
  const { data: users, isLoading } = useQueryCommunity();

  if (isLoading)
    return (
      <div data-testid="no-data" className="flex-col align-center mt-5 gap-2">
        <h1>Communauté</h1>
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!users)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <main
      data-testid="community"
      className="community pb-5 flex-col align-center"
      style={{ minHeight: '55dvh' }}>
      <header className="community__header w-100">
        <img src={community} alt="sièges de cinéma" />
        <div className="flex align-center">
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
          <h1 className="my-1 px-2">Communauté</h1>
          <div
            className="w-100"
            style={{
              backgroundColor: 'var(--color-primary-700)',
              height: '2px'
            }}
          />
        </div>
      </header>

      <div
        className="flex flex-wrap justify-center gap-1 mt-2"
        style={{ maxWidth: '50rem' }}>
        {users.map((user, index) => (
          <CommunityItem
            key={index}
            username={user.username}
            id={user.id}
            user_critics={user.user_critics}
            user_masterpieces={user.user_masterpieces}
            user_votes={user.user_votes}
            user_watchlists={user.user_watchlists}
          />
        ))}
      </div>
    </main>
  );
};

export default Community;
