import { useNavigate } from 'react-router-dom';
import './HomeCard.scss';

interface IHomeCardProps {
  img: string;
  name: string;
  link: string;
}

const HomeCard = ({ img, name, link }: IHomeCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      className="homeCard"
      style={{ backgroundImage: `url(${img})` }}
      onClick={() => navigate(link)}>
      <div className="homeCard__blur">
        <h2>{name}</h2>
      </div>
    </div>
  );
};

export default HomeCard;
