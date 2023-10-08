import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { CriticMusic } from '@components/index';
import { useQueryMusicCritics } from '@queries/index';

interface IMusicCriticsProps {
  user?: number;
}

const MusicCritics = ({ user }: IMusicCriticsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: critics, isLoading } = useQueryMusicCritics(currentPage, user);

  if (isLoading)
    return (
      <div className="flex-col align-center gap-1">
        {!!!user && <h1 className="self-center mb-2">Critiques</h1>}
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!critics || critics.total === 0)
    return (
      <div className="flex-col justify-center gap-1">
        {!!!user && <h1 className="self-center mb-2">Critiques</h1>}
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center align-center gap-1 w-100">
      {!!!user && <h1 className="self-center mb-2">Critiques</h1>}

      {critics.data.map((critic, index) => (
        <CriticMusic
          key={index}
          id={critic.id}
          content={critic.content}
          userId={critic.user.id}
          userName={critic.user.username}
          albumId={critic.album_id}
          albumName={critic.album_name}
          artistId={critic.artist_id}
          artistName={critic.artist_name}
        />
      ))}

      <Pagination
        className="self-center mb-2"
        total={critics.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />
    </div>
  );
};

export default MusicCritics;
