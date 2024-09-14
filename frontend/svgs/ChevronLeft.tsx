import { gray9 } from '@frontend/utils/colors';
import { SVGProps } from 'react';

export function ChevronLeft({
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
      data-testId="chevron-left"
      {...props}
    >
      <g id="chevron-left">
        <path
          id="Vector"
          d="M15 6L9 12L15 18"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
