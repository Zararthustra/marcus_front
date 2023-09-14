import { useState } from 'react';
import { Pagination } from 'antd';

import { Vote } from '@components/index';
import { IconClapLoader } from '@assets/index';
import { useQueryVotes } from '@queries/index';

interface IVotesProps {
  user?: number;
}

const Votes = ({ user }: IVotesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: votes, isLoading } = useQueryVotes(currentPage, user);

  if (isLoading)
    return (
      <IconClapLoader width={100} height={100} className="loader-cinema" />
    );

  if (!!!votes) return <div>Une erreur est survenue</div>;
  return (
    <div className="flex-col justify-center gap-3">
      <Pagination
        className="self-center"
        total={votes.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      <div className="flex flex-wrap gap-1 justify-evenly">
        {votes.data.map((vote, index) => (
          <Vote
            key={index}
            userId={vote.user_id}
            userName={vote.user_name}
            movieId={vote.movie_id}
            movieName={vote.movie_name}
            value={vote.value}
          />
        ))}
      </div>

      <Pagination
        className="self-center"
        total={votes.total}
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

export default Votes;
