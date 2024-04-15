import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { GendersFilter, Masterpiece } from '@components/index';
import { useQueryWatchlists } from '@queries/index';
import { movieTags } from '@data/tags';

interface IWatchlistsProps {
  user?: number;
}

const Watchlists = ({ user }: IWatchlistsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState<string>(movieTags[0]);
  const { data: watchlists, isLoading } = useQueryWatchlists(
    currentPage,
    user,
    tag
  );

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        {!!!user && <h1 className="self-center">Watchlist</h1>}
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!watchlists || watchlists.total === 0)
    return (
      <div className="flex-col justify-center gap-3">
        {!!!user && <h1 className="self-center">Watchlist</h1>}
        <GendersFilter tag={tag} setTag={setTag} />
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center align-center gap-3">
      {!!!user && <h1 className="self-center">Watchlist</h1>}

      <GendersFilter tag={tag} setTag={setTag} />

      <Pagination
        className="self-center mb-2"
        total={watchlists.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      {watchlists.data.map((movie, index) => (
        <Masterpiece
          key={index}
          userId={movie.user_id}
          userName={movie.user_name}
          movieId={movie.movie_id}
          movieName={movie.movie_name}
          movieDetails={movie.movie_details}
          platform={movie.platform}
        />
      ))}

      <Pagination
        className="self-center mb-2"
        total={watchlists.total}
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

export default Watchlists;
