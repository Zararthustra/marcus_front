import { IIcon } from '@interfaces/index';

const IconClapLoader = ({
  width = 24,
  height = 24,
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
    viewBox="-3 -10 55 65">
    <g fillRule="evenodd" clipRule="evenodd">
      <path d="M1.04794 19.7275V44.9546C1.04794 46.2927 1.56369 47.576 2.48171 48.5222C3.39974 49.4684 4.64486 50 5.94315 50H45.1048C47.8216 50 50 47.7548 50 44.9546V19.7275H1.04794Z" />
      <path d="M47.1608 0L37.5417 1.96771L44.2481 10.8981L49.0699 9.889L47.1608 0ZM30.3458 3.43088L25.524 4.41473L32.2549 13.3199L37.0522 12.336L30.3458 3.43088ZM18.3525 5.85267L13.5307 6.88698L20.2616 15.7921L25.0589 14.8083L18.3525 5.85267ZM6.33478 8.37538L3.93613 8.85469C2.66431 9.1166 1.54531 9.88799 0.824835 10.9995C0.104356 12.111 -0.158713 13.4718 0.0933906 14.783L1.04796 19.7275L13.0412 17.2805L6.33478 8.37538Z" />
    </g>
  </svg>
);

export default IconClapLoader;
