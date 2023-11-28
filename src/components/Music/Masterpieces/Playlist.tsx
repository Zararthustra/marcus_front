import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { MusicMasterpiece } from '@components/index';
import { useQueryMusicPlaylist } from '@queries/index';

interface IPlaylistProps {
  user: number;
}

const Playlist = ({ user }: IPlaylistProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: playlist, isLoading } = useQueryMusicPlaylist(
    currentPage,
    user
  );

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!playlist || playlist.total === 0)
    return (
      <div className="flex-col justify-center">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center">
      <Pagination
        className="self-center mt-2"
        total={playlist.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      <div className="flex flex-wrap gap-05 justify-evenly align-center">
        {playlist.data.map((playlist, index) => (
          <MusicMasterpiece
            key={index}
            user={playlist.user}
            id={playlist.id}
            albumId={playlist.album_id}
            albumName={playlist.album_name}
            artistId={playlist.artist_id}
            artistName={playlist.artist_name}
            imageUrl={playlist.image_url}
          />
        ))}
      </div>

      <Pagination
        className="self-center mt-2"
        total={playlist.total}
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

export default Playlist;
