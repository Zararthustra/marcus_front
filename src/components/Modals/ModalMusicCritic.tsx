import { App, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

import { Button } from '@components/index';
import { useMutationCreateAlbumCritic } from '@queries/index';
import { capitalizeFirstLetter, messageObject } from '@utils/formatters';

interface IModalMusicCriticProps {
  albumName: string;
  albumId: string;
  artistName: string;
  artistId: string;
  imageUrl: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const ModalMusicCritic = ({
  albumName,
  albumId,
  artistId,
  artistName,
  imageUrl,
  showModal,
  setShowModal
}: IModalMusicCriticProps) => {
  const { message } = App.useApp();
  const { mutate, isSuccess, isLoading } = useMutationCreateAlbumCritic();
  const [critic, setCritic] = useState<string>('');

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setCritic(capitalizeFirstLetter(value));
  };

  const handleSubmit = () => {
    if (!!!critic) {
      message.error(messageObject('error', 'Votre critique est vide'));
      return;
    }
    mutate({
      content: critic,
      album_id: albumId,
      album_name: albumName,
      image_url: imageUrl,
      artist_name: artistName,
      artist_id: artistId
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setCritic('');
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

        <div className="form__field w-100 mb-2">
          <label className="form__label" htmlFor="critic">
            Critique
          </label>
          <Input.TextArea
            id="critic"
            showCount
            maxLength={2000}
            placeholder="Après une longue attente, voici un nouveau chef d'oeuvre..."
            rows={8}
            value={critic}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalMusicCritic;
