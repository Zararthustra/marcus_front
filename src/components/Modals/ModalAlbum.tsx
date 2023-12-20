import { Modal } from 'antd';

import {
  IconCritic,
  IconMasterpiece,
  IconShare,
  IconVote,
  IconWatchlist
} from '@assets/index';
import { Button, Player } from '@components/index';

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
  setSearchParams?: (value: any) => void;
  handleMasterpieces?: () => void;
  handlePlaylists?: () => void;
  addedMasterpiece?: string | undefined;
  addedPlaylist?: string | undefined;
  showButtons?: boolean;
}

const ModalAlbum = ({
  showButtons,
  selectedAlbum,
  hasCriticized,
  hasVoted,
  addedMasterpiece,
  addedPlaylist,
  handleMasterpieces,
  handlePlaylists,
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
          {!!navigator.share && setSearchParams && (
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
        if (setSearchParams) setSearchParams({});
      }}>
      <div className="flex-col align-center">
        <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          {selectedAlbum.albumName}
        </h2>
        {showButtons && (
          <div className="flex self-start gap-05 mb-1">
            <Button
              onClick={handleMasterpieces}
              className={`movie__button ${
                addedMasterpiece ? '' : 'movie__button--add'
              }`}>
              <IconMasterpiece width={20} height={20} />
            </Button>
            <Button
              onClick={handlePlaylists}
              className={`movie__button ${
                addedPlaylist ? '' : 'movie__button--add'
              }`}>
              <IconWatchlist width={20} height={20} />
            </Button>
          </div>
        )}
        <Player uri={'album/' + selectedAlbum.albumId} height={400} />
      </div>
    </Modal>
  );
};

export default ModalAlbum;
