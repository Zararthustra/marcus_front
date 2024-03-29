import { IIcon } from '@interfaces/index';

const IconClap = ({
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
    viewBox="0 0 20 20">
    <g fillRule="evenodd" clipRule="evenodd">
      <path d="M.768 4.972a.5.5 0 0 1 .382-.595l14.652-3.208a.5.5 0 0 1 .596.381l.642 2.93a.5.5 0 0 1-.382.596L2.005 8.284a.5.5 0 0 1-.595-.381l-.642-2.93Zm1.084.275L2.28 7.2l13.676-2.995l-.428-1.954L1.852 5.247Z" />
      <path d="M9.854 6.338L7.26 3.835l.694-.72l2.596 2.503l-.695.72Zm-3.907.855L3.352 4.691l.694-.72L6.64 6.474l-.694.72Zm7.815-1.711L11.166 2.98l.695-.72l2.595 2.503l-.694.72Zm-4.773 5.795l2-3l-.832-.554l-2 3l.832.554Zm4 0l2-3l-.832-.554l-2 3l.832.554Zm-8 0l2-3l-.832-.554l-2 3l.832.554Z" />
      <path d="M1.573 8a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-15a.5.5 0 0 1-.5-.5V8Zm1 .5v8h14v-8h-14Z" />
      <path d="M17.573 11.5h-16v-1h16v1Z" />
    </g>
  </svg>
);

export default IconClap;
