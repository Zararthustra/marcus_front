import { Modal } from 'antd';

import { Button, Player } from '@components/index';
import { IconCritic, IconShare, IconVote } from '@assets/index';

interface IModalAlbumProps {
  hasCriticized?: boolean;
  hasVoted?: boolean;
  selectedAlbum: {
    albumId: string;
    albumName: string;
    imageUrl: string;
  };
  setSelectedAlbum: (value: any) => void;
  setIsCriticizing?: (value: boolean) => void;
  setIsVoting?: (value: boolean) => void;
  setSearchParams: (value: any) => void;
}

const ModalAlbum = ({
  selectedAlbum,
  hasCriticized,
  hasVoted,
  setSearchParams,
  setSelectedAlbum,
  setIsCriticizing,
  setIsVoting
}: IModalAlbumProps) => {
  return (
    <Modal
      centered
      open={!!selectedAlbum.albumId}
      width={400}
      footer={
        <>
          <div className="flex w-100 gap-1">
            {!hasCriticized && setIsCriticizing && (
              <Button
                primary
                className="w-100"
                onClick={() => setIsCriticizing(true)}>
                <IconCritic width={20} height={20} />
                <p className="m-0">Critiquer</p>
              </Button>
            )}
            {!hasVoted && setIsVoting && (
              <Button
                primary
                className="w-100"
                onClick={() => setIsVoting(true)}>
                <IconVote width={20} height={20} />
                <p className="m-0">Voter</p>
              </Button>
            )}
          </div>
          {!!navigator.share && (
            <div className="flex w-100 my-05">
              <Button
                className="w-100 px-0"
                onClick={() =>
                  navigator.share({
                    text: "Voici un album que j'ai découvert",
                    title: selectedAlbum.albumName,
                    url: window.location.href
                  })
                }>
                <IconShare />
                Partager l'album
              </Button>
            </div>
          )}
        </>
      }
      onCancel={() => {
        setSelectedAlbum({
          albumId: '',
          albumName: '',
          imageUrl: ''
        });
        setSearchParams({});
      }}>
      <div className="ModalAlbum flex-col align-center pt-2">
        <h2 className="mb-2">{selectedAlbum.albumName}</h2>
        <Player uri={'album/' + selectedAlbum.albumId} height={450} />
      </div>
    </Modal>
  );
};

export default ModalAlbum;
