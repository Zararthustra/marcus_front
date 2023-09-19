import { useMediaQuery } from 'react-responsive';

import { HomeCard } from '@components/index';
import { community, vinyl, projector, tickets } from '@assets/index';

import './Home.scss';

const Home = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 800px)' });
  const cards = [
    { name: 'Cinéma', img: projector, link: '/cinema' },
    { name: 'Musique', img: vinyl, link: '/musique' },
    { name: 'Communauté', img: community, link: '/communaute' },
    { name: 'Connexion & Inscription', img: tickets, link: '/login' }
  ];

  return (
    <div className="home flex-col align-center mt-3">
      {!isMobile && <h1 className="my-2">Marcus</h1>}
      <div className="home__cards flex flex-wrap justify-center w-100">
        {cards.map((card, index) => (
          <HomeCard
            key={index}
            img={card.img}
            name={card.name}
            link={card.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
