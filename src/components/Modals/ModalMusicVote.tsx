import { App, Modal, Rate } from 'antd';
import { useEffect, useState } from 'react';

import { IconVote } from '@assets/index';
import { Button } from '@components/index';
import { messageObject } from '@utils/formatters';
import { useMutationCreateMusicVote } from '@queries/index';

interface IModalMusicVoteProps {
  albumName: string;
  albumId: string;
  imageUrl: string;
  artistName: string;
  artistId: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const ModalMusicVote = ({
  albumName,
  albumId,
  imageUrl,
  artistName,
  artistId,
  showModal,
  setShowModal
}: IModalMusicVoteProps) => {
  const { message } = App.useApp();
  const { mutate, isSuccess, isLoading } = useMutationCreateMusicVote();
  const [vote, setVote] = useState<number>(0);

  const handleInputChange = (value: number) => {
    setVote(value);
  };

  const handleSubmit = () => {
    if (!!!vote) {
      message.error(messageObject('error', 'Sélectionnez une étoile'));
      return;
    }
    mutate({
      album_id: albumId,
      album_name: albumName,
      value: vote,
      image_url: imageUrl,
      artist_name: artistName,
      artist_id: artistId
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setVote(0);
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
        <h2>{albumName}</h2>

        <Rate
          allowHalf
          id="vote"
          character={<IconVote width={50} height={50} />}
          className="my-2"
          value={vote}
          onChange={handleInputChange}
        />
      </div>
    </Modal>
  );
};

export default ModalMusicVote;
