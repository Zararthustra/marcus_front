import { useLocation } from 'react-router-dom';

import { seats } from '@assets/index';

import './Footer.scss';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/login') return;

  return (
    <footer
      className="footer flex-col justify-center align-center"
      style={{ backgroundImage: `url(${seats})` }}>
      <p>
        Ce produit utilise l'API TMDB mais n'est ni approuvé ni certifié par{' '}
        <a href="https://www.themoviedb.org/">TMDB</a>
      </p>
      <p className="ARR">Tous droits réservés © Marcus 2023</p>
    </footer>
  );
};

export default Footer;
