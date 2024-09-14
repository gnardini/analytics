import { gray6 } from '@frontend/utils/colors';
import { SVGProps } from 'react';

export function CrossIcon({
  size = 24,
  color = gray6,
  ...props
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g id="Close">
        <path
          id="Vector"
          d="M7.05033 16.9497L12.0001 12M16.9498 7.05025L12.0001 12M12.0001 12L16.9498 16.9497M12.0001 12L7.05033 7.05025"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
