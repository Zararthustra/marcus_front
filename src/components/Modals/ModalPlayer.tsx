import { Modal } from 'antd';
import { Player } from '@components/index';

interface IModalPlayerProps {
  uri: string;
  showModal: boolean;
  setShowModal: (value: string) => void;
}

const ModalPlayer = ({ uri, showModal, setShowModal }: IModalPlayerProps) => {
  return (
    <Modal
      centered
      open={showModal}
      width={400}
      footer={null}
      onCancel={() => setShowModal('')}>
      <div className="flex-col align-center pt-2">
        <Player uri={uri} height={500} />
      </div>
    </Modal>
  );
};

export default ModalPlayer;
