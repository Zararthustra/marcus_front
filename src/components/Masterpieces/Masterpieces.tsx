import { useState } from 'react';
import { Pagination } from 'antd';

import { IconClapLoader } from '@assets/index';
import { Masterpiece } from '@components/index';
import { useQueryMasterpieces } from '@queries/index';

interface IMasterpiecesProps {
  user?: number;
}

const Masterpieces = ({ user }: IMasterpiecesProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: masterpieces, isLoading } = useQueryMasterpieces(
    currentPage,
    user
  );

  if (isLoading)
    return (
      <IconClapLoader width={100} height={100} className="loader-cinema" />
    );

  if (!!!masterpieces) return <div>Une erreur est survenue</div>;
  return (
    <div className="flex-col justify-center gap-3">
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
