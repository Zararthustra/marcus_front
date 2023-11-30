import { IconHome, notfound } from '@assets/index';
import { Button } from '@components/index';
import { Link } from 'react-router-dom';

import './NotFound.scss';

const NotFound = () => (
  <div data-testid="notfound" className="notfound flex-col align-center">
    <div className="flex-col justify-center align-center mt-5">
      <h1 className="mb-2">Vous allez où comme ça ?</h1>
      <Link to={'/'}>
        <Button primary>
          <IconHome />
          Retour à l'accueil
        </Button>
      </Link>
    </div>

    <img src={notfound} alt="Travolta gif" />
  </div>
);

export default NotFound;
