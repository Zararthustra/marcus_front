import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { MusicMasterpiece } from '@components/index';
import { useQueryMusicMasterpieces } from '@queries/index';
import { IconClapLoader } from '@assets/index';

interface IMasterpiecesProps {
  user?: number;
}

const Masterpieces = ({ user }: IMasterpiecesProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: masterpieces, isLoading } = useQueryMusicMasterpieces(
    currentPage,
    user
  );

  if (isLoading)
    return (
      <div className="flex-col align-center gap-3">
        {!!!user && <h1 className="self-center">Chefs d'oeuvres</h1>}
        <IconClapLoader width={100} height={100} className="loader-cinema" />
      </div>
    );

  if (!!!masterpieces || masterpieces.total === 0)
    return (
      <div className="flex-col justify-center">
        {!!!user && <h1 className="self-center">Chefs d'oeuvres</h1>}
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center">
      {!!!user && <h1 className="self-center">Chefs d'oeuvres</h1>}

      <Pagination
        className="self-center mt-2"
        total={masterpieces.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      <div className="flex flex-wrap gap-05 justify-evenly align-center">
        {masterpieces.data.map((masterpiece, index) => (
          <MusicMasterpiece
            key={index}
            user={masterpiece.user}
            id={masterpiece.id}
            albumId={masterpiece.album_id}
            albumName={masterpiece.album_name}
            artistId={masterpiece.artist_id}
            artistName={masterpiece.artist_name}
            imageUrl={masterpiece.image_url}
          />
        ))}
      </div>

      <Pagination
        className="self-center mt-2"
        total={masterpieces.total}
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

export default Masterpieces;
