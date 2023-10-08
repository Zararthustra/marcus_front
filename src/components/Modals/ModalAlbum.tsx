import { Modal } from 'antd';

import { Button, Player } from '@components/index';
import { IconCritic, IconVote } from '@assets/index';

interface IModalAlbumProps {
  hasCriticized: boolean;
  selectedAlbum: {
    albumId: string;
    albumName: string;
    imageUrl: string;
  };
  setSelectedAlbum: (value: any) => void;
  setIsCriticizing: (value: boolean) => void;
}

const ModalAlbum = ({
  selectedAlbum,
  hasCriticized,
  setSelectedAlbum,
  setIsCriticizing
}: IModalAlbumProps) => {
  return (
    <Modal
      centered
      open={!!selectedAlbum.albumId}
      width={400}
      footer={
        <div className="flex w-100 gap-1">
          {!hasCriticized && (
            <Button
              primary
              className="w-100"
              onClick={() => setIsCriticizing(true)}>
              <IconCritic width={20} height={20} />
              <p className="m-0">Critiquer</p>
            </Button>
          )}
          <Button primary disabled className="w-100">
            <IconVote width={20} height={20} />
            <p className="m-0">Voter</p>
          </Button>
        </div>
      }
      onCancel={() =>
        setSelectedAlbum({
          albumId: '',
          albumName: '',
          imageUrl: ''
        })
      }>
      <div className="ModalAlbum flex-col align-center pt-2">
        <h2 className="mb-2">{selectedAlbum.albumName}</h2>
        <Player uri={'album/' + selectedAlbum.albumId} height={370} />
      </div>
    </Modal>
  );
};

export default ModalAlbum;
