import { IIcon } from '@interfaces/index';

const IconMusic = ({
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
    viewBox="0 0 256 256">
    <path d="M212.92 25.69a8 8 0 0 0-6.86-1.45l-128 32A8 8 0 0 0 72 64v110.08A36 36 0 1 0 88 204v-85.75l112-28v51.83A36 36 0 1 0 216 172V32a8 8 0 0 0-3.08-6.31ZM52 224a20 20 0 1 1 20-20a20 20 0 0 1-20 20Zm36-122.25v-31.5l112-28v31.5ZM180 192a20 20 0 1 1 20-20a20 20 0 0 1-20 20Z" />
  </svg>
);

export default IconMusic;
