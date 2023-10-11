import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { MusicVote } from '@components/index';
import { IconClapLoader } from '@assets/index';
import { useQueryMusicVotes } from '@queries/index';

interface IVotesProps {
  user?: number;
}

const Votes = ({ user }: IVotesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: votes, isLoading } = useQueryMusicVotes(currentPage, user);

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        {!!!user && <h1 className="self-center">Votes</h1>}
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!votes || votes.total === 0)
    return (
      <div className="flex-col justify-center gap-3">
        {!!!user && <h1 className="self-center">Votes</h1>}
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center gap-3">
      {!!!user && <h1 className="self-center">Votes</h1>}

      <div className="flex flex-wrap gap-05 justify-evenly">
        {votes.data.map((vote, index) => (
          <MusicVote
            key={index}
            user={vote.user}
            id={vote.id}
            albumId={vote.album_id}
            albumName={vote.album_name}
            value={vote.value}
            artistId={vote.artist_id}
            artistName={vote.artist_name}
            imageUrl={vote.image_url}
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
