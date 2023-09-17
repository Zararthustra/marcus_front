import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { Masterpiece } from '@components/index';
import { useQueryWatchlists } from '@queries/index';

interface IWatchlistsProps {
  user?: number;
}

const Watchlists = ({ user }: IWatchlistsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: watchlists, isLoading } = useQueryWatchlists(currentPage, user);

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        <h1 className="self-center">Watchlist</h1>
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!watchlists)
    return (
      <div className="flex-col justify-center gap-3">
        <h1 className="self-center">Watchlist</h1>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center gap-3">
      <h1 className="self-center">Watchlist</h1>

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
