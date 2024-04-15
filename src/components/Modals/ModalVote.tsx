import { App, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';

import { Button } from '@components/index';
import { messageObject } from '@utils/formatters';
import { useMutationCreateVote } from '@queries/index';
import { IconVote } from '@assets/index';

interface IModalVoteProps {
  movieName: string;
  movieId: number;
  platform: 'tv' | 'movie';
  showModal: boolean;
  tags: string;
  setShowModal: (value: boolean) => void;
}

const ModalVote = ({
  movieName,
  movieId,
  platform,
  showModal,
  tags,
  setShowModal
}: IModalVoteProps) => {
  const { message } = App.useApp();
  const { mutate, isSuccess, isLoading } = useMutationCreateVote();
  const [vote, setCritic] = useState({
    value: 0,
    movie_id: movieId,
    movie_name: movieName,
    platform: platform,
    tags: tags
  });

  const handleInputChange = (value: number) => {
    setCritic((prevFormData) => ({
      ...prevFormData,
      value: value
    }));
  };

  const handleSubmit = () => {
    if (!!!vote.value) {
      message.error(messageObject('error', 'Sélectionnez une étoile'));
      return;
    }
    mutate(vote);
  };

  useEffect(() => {
    if (isSuccess) {
      setCritic((prevFormData) => ({
        ...prevFormData,
        value: 0
      }));
      setShowModal(false);
    }
  }, [isSuccess]);

  return (
    <Modal
      centered
      open={showModal}
      onCancel={() => setShowModal(false)}
      width={400}
      footer={
        <div className="flex-col gap-05 w-100">
          <Button primary loading={isLoading} onClick={handleSubmit}>
            Confirmer
          </Button>
          <Button onClick={() => setShowModal(false)}>Annuler</Button>
        </div>
      }>
      <div className="flex-col align-center">
        <h2>{movieName}</h2>

        <Rate
          allowHalf
          id="vote"
          character={<IconVote width={50} height={50} />}
          className="my-2"
          value={vote.value}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default ModalVote;
