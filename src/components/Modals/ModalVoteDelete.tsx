import { Modal } from 'antd';
import { useEffect } from 'react';

import { Button } from '@components/index';
import { IconTrash, IconWarning } from '@assets/index';
import { useMutationDeleteVote } from '@queries/index';

interface IModalVoteDeleteProps {
  movieName: string;
  movieId: number;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const ModalVoteDelete = ({
  movieName,
  movieId,
  showModal,
  setShowModal
}: IModalVoteDeleteProps) => {
  const { mutate: deleteVote, isLoading, isSuccess } = useMutationDeleteVote();

  useEffect(() => {
    if (isSuccess) setShowModal(false);
  }, [isSuccess]);

  return (
    <Modal
      centered
      open={showModal}
      onCancel={() => setShowModal(false)}
      width={400}
      footer={
        <div className="flex-col gap-05 w-100">
          <Button
            primary
            loading={isLoading}
            onClick={() => deleteVote(movieId)}>
            <IconTrash />
            Supprimer
          </Button>
          <Button onClick={() => setShowModal(false)}>Annuler</Button>
        </div>
      }>
      <div className="flex-col align-center">
        <h1>Êtes-vous sûr ?</h1>

        <div className="flex align-center gap-1 py-05 my-2 tag--warning br-s">
          <IconWarning className="sidebar__icon" />
          <p className="m-0 f-s">
            Vous êtes sur le point de supprimer votre vote pour{' '}
            <strong className="f-m">{movieName}</strong>.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalVoteDelete;
