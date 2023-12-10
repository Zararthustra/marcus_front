import { Modal } from 'antd';

import { IconInfo } from '@assets/index';
import { Button } from '@components/index';
import { getLS } from '@services/localStorageService';
import { useMutationReconnect } from '@queries/index';

interface IModalReconnectProps {
  showReconnectModal: boolean;
  logout: () => void;
}

const ModalReconnect = ({
  showReconnectModal,
  logout
}: IModalReconnectProps) => {
  const { mutate, isLoading } = useMutationReconnect();

  return (
    <Modal
      centered
      open={showReconnectModal}
      width={400}
      closable={false}
      footer={
        <div className="flex-col gap-05 w-100">
          <Button
            onClick={() => mutate(getLS('refreshToken'))}
            primary
            loading={isLoading}
            style={{ fontWeight: 600 }}>
            Se reconnecter
          </Button>
          <Button onClick={logout}>Se déconnecter</Button>
        </div>
      }>
      <div className="flex-col align-center">
        <h2>⌛ Session expirée ⌛</h2>
        <p className="mt-2 mb-0">Que désirez-vous faire ?</p>
        <div className="tag--info br-m mt-2 flex gap-05 align-center justify-center">
          <IconInfo size={45} style={{ flexShrink: 0 }} />
          <p className="f-s m-05">
            Pas de panique ! Pour des raisons de sécurité, votre session expire
            après un certain temps.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default ModalReconnect;
