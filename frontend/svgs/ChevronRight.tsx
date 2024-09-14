import { gray9 } from '@frontend/utils/colors';
import { SVGProps } from 'react';

export function ChevronRight({
  color = gray9,
  size = 18,
  strokeWidth = 1.5,
  ...props
}: {
  color?: string;
  size?: number;
  strokeWidth?: number;
} & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`${props.className} group-hover/landing:bg-gray-0 group-hover/landing:rounded-full`}
    >
      <g id="chevron-right">
        <path
          id="Vector"
          d="M9 6L15 12L9 18"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
