import { App, Input, Modal } from 'antd';
import { useEffect, useState } from 'react';

import { Button } from '@components/index';
import { messageObject } from '@utils/formatters';
import { useMutationCreateCritic } from '@queries/index';

interface IModalCriticProps {
  movieName: string;
  movieId: number;
  platform: 'tv' | 'movie';
  showModal: boolean;
  tags: string;
  setShowModal: (value: boolean) => void;
}

const ModalCritic = ({
  movieName,
  movieId,
  platform,
  showModal,
  tags,
  setShowModal
}: IModalCriticProps) => {
  const { message } = App.useApp();
  const { mutate, isSuccess, isLoading } = useMutationCreateCritic();
  const [critic, setCritic] = useState({
    content: '',
    movie_id: movieId,
    movie_name: movieName,
    platform: platform,
    tags: tags
  });

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setCritic((prevFormData) => ({
      ...prevFormData,
      content: value
    }));
  };

  const handleSubmit = () => {
    if (!!!critic.content) {
      message.error(messageObject('error', 'Votre critique est vide'));
      return;
    }
    mutate(critic);
  };

  useEffect(() => {
    if (isSuccess) {
      setCritic((prevFormData) => ({
        ...prevFormData,
        content: ''
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

        <div className="form__field w-100 mb-2">
          <label className="form__label" htmlFor="critic">
            Critique
          </label>
          <Input.TextArea
            id="critic"
            showCount
            maxLength={2000}
            placeholder="À quoi reconnaît-on un vrai grand film ? À son succès critique ? Trop facile. À son succès public ? Trop commode..."
            rows={8}
            value={critic.content}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalCritic;
