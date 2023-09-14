import { useState } from 'react';
import { Pagination } from 'antd';

import { Critic } from '@components/index';
import { useQueryCritics } from '@queries/index';

import './Critics.scss';

interface ICriticsProps {
  user?: number;
}

const Critics = ({ user }: ICriticsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: critics, isLoading } = useQueryCritics(currentPage, user);

  if (isLoading) return <div>Loading</div>;
  if (!!!critics) return <div>Error</div>;
  return (
    <div className="critics flex-col justify-center gap-1">
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

      {critics.data.map((critic, index) => (
        <Critic
          key={index}
          userId={critic.user_id}
          userName={critic.user_name}
          movieId={critic.movie_id}
          movieName={critic.movie_name}
          content={critic.content}
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
