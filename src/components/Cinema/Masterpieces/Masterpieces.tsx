import { useState } from 'react';
import { Empty, Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { GendersFilter, Masterpiece } from '@components/index';
import { useQueryMasterpieces } from '@queries/index';
import { movieTags } from '@data/tags';

interface IMasterpiecesProps {
  user?: number;
}

const Masterpieces = ({ user }: IMasterpiecesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [tag, setTag] = useState<string>(movieTags[0]);
  const { data: masterpieces, isLoading } = useQueryMasterpieces(
    currentPage,
    user,
    tag
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
      <div className="flex-col justify-center gap-3">
        {!!!user && <h1 className="self-center">Chefs d'oeuvres</h1>}
        <GendersFilter tag={tag} setTag={setTag} />

        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      </div>
    );

  return (
    <div className="flex-col justify-center align-center gap-3">
      {!!!user && <h1 className="self-center">Chefs d'oeuvres</h1>}

      <GendersFilter tag={tag} setTag={setTag} />

      <Pagination
        className="self-center mb-2"
        total={masterpieces.total}
        onChange={(page) => setCurrentPage(page)}
        // showTotal={(total, range) => `${range[0]}-${range[1]} sur ${total}`}
        defaultPageSize={10}
        showSizeChanger={false}
        current={currentPage}
        hideOnSinglePage
        responsive
      />

      {masterpieces.data.map((masterpiece, index) => (
        <Masterpiece
          key={index}
          userId={masterpiece.user_id}
          userName={masterpiece.user_name}
          movieId={masterpiece.movie_id}
          movieName={masterpiece.movie_name}
          movieDetails={masterpiece.movie_details}
          platform={masterpiece.platform}
        />
      ))}

      <Pagination
        className="self-center mb-2"
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
