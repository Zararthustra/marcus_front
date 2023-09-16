import { Empty } from 'antd';

import { IconClapLoader } from '@assets/index';
import { useQueryCommunity } from '@queries/index';
import { CommunityItem } from '@components/index';

const Community = () => {
  const { data: users, isLoading } = useQueryCommunity();

  if (isLoading)
    return (
      <div className="flex-col align-center mt-5 gap-2">
        <h1>Communauté</h1>
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!users)
    return <Empty className="mt-5" image={Empty.PRESENTED_IMAGE_SIMPLE} />;

  return (
    <main className="community mt-5 flex-col align-center gap-2">
      <h1>Communauté</h1>
      <div
        className="flex flex-wrap justify-center gap-1"
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
