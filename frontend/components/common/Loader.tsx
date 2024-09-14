import { CSSProperties } from 'react';

export function Loader({
  size = 20,
  borderWidth = 1.5,
  color = 'white',
  className = '',
}: {
  size?: number;
  borderWidth?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={`loader ${className}`}
      style={{
        display: 'block',
        width: size,
        height: size,
        border: `${borderWidth}px solid ${color}`,
        borderBottomColor: 'transparent',
        borderRadius: '50%',
      }}
    />
  );
}
