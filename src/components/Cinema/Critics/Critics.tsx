import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { Critic, GendersFilter } from '@components/index';
import { IconClapLoader } from '@assets/index';
import { useQueryCritics } from '@queries/index';
import { movieTags } from '@data/tags';

interface ICriticsProps {
  user?: number;
}

const Critics = ({ user }: ICriticsProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [tag, setTag] = useState<string>(movieTags[0]);
  const { data: critics, isLoading } = useQueryCritics(currentPage, user, tag);

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
        <GendersFilter tag={tag} setTag={setTag} />
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center align-center gap-1 w-100">
      {!!!user && <h1 className="self-center mb-2">Critiques</h1>}

      <GendersFilter tag={tag} setTag={setTag} />

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
