import { useState } from 'react';
import { Empty, Pagination, Rate } from 'antd';

import { GendersFilter, Vote } from '@components/index';
import { useQueryVotes } from '@queries/index';
import { IconClapLoader, IconVote } from '@assets/index';
import { movieTags } from '@data/tags';

interface IVotesProps {
  user?: number;
}

const Votes = ({ user }: IVotesProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [stars, setStars] = useState<number | undefined>(undefined);
  const [tag, setTag] = useState<string>(movieTags[0]);
  const { data: votes, isLoading } = useQueryVotes(
    currentPage,
    user,
    stars,
    undefined,
    tag
  );

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        {!!!user && <h1 className="self-center">Votes</h1>}
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!votes || votes.total === 0)
    return (
      <div className="flex-col justify-center">
        {!!!user && <h1 className="self-center">Votes</h1>}

        <GendersFilter tag={tag} setTag={setTag} />

        <Rate
          allowHalf
          allowClear
          id="vote"
          className="self-center"
          character={<IconVote width={30} height={30} />}
          value={stars}
          onChange={(value) => setStars(!!value ? value : undefined)}
        />

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center align-center gap-3">
      {!!!user && <h1 className="self-center">Votes</h1>}

      <GendersFilter tag={tag} setTag={setTag} />

      <Rate
        allowHalf
        allowClear
        id="vote"
        className="self-center"
        character={<IconVote width={30} height={30} />}
        value={stars}
        onChange={(value) => setStars(!!value ? value : undefined)}
      />

      <Pagination
        className="self-center mt-2"
        total={votes.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      <div className="flex flex-wrap gap-05 justify-evenly">
        {votes.data.map((vote, index) => (
          <Vote
            key={index}
            userId={vote.user_id}
            userName={vote.user_name}
            movieId={vote.movie_id}
            movieName={vote.movie_name}
            value={vote.value}
            platform={vote.platform}
          />
        ))}
      </div>

      <Pagination
        className="self-center mt-2"
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
