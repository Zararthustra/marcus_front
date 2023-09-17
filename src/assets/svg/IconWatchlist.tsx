import { IIcon } from '@interfaces/index';

const IconWatchlist = ({
  width = 30,
  height = 30,
  className = '',
  style,
  color,
  onClick
}: IIcon) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    onClick={onClick}
    className={className}
    style={style}
    fill={color ?? 'currentColor'}
    viewBox="0 0 20 20">
    <path d="M19 3H3v2h16zm0 6h-6v2h6zm0 6h-8v2h8zm-8-4.24H7.15L5.5 7l-1.65 3.76H0l3 3.17l-.9 4.05l3.4-2.14L8.9 18L8 13.95Z" />
  </svg>
);

export default IconWatchlist;
