import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { Critic } from '@components/index';
import { IconClapLoader } from '@assets/index';
import { useQueryCritics } from '@queries/index';

interface ICriticsProps {
  user?: number;
}

const Critics = ({ user }: ICriticsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: critics, isLoading } = useQueryCritics(currentPage, user);

  if (isLoading)
    return (
      <div className="flex-col justify-center gap-1">
        <h1 className="self-center mb-2">Critiques</h1>
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!critics)
    return (
      <div className="flex-col justify-center gap-1">
        <h1 className="self-center mb-2">Critiques</h1>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center gap-1">
      <h1 className="self-center mb-2">Critiques</h1>

      {critics.data.map((critic, index) => (
        <Critic
          key={index}
          userId={critic.user_id}
          userName={critic.user_name}
          movieId={critic.movie_id}
          movieName={critic.movie_name}
          content={critic.content}
          platform={critic.platform}
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

export default Critics;
