import { gray4 } from '@frontend/utils/colors';
import { SVGProps } from 'react';

export function HelpIcon({
  size = 20,
  color = gray4,
  ...props
}: { size?: number; color?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="help-circle" clipPath="url(#clip0_2202_31836)">
        <path
          id="Vector"
          d="M7.57496 7.49998C7.77088 6.94304 8.15758 6.4734 8.66659 6.17426C9.16734 5.87996 9.7364 5.78388 10.2799 5.86357C10.8842 5.95217 11.4568 6.25809 11.8686 6.75045C12.3265 7.29783 12.5428 8.02566 12.2968 8.74999C11.977 9.6911 10.991 10.4808 9.93329 10.8333M9.99996 14.1667H10.0083M18.3333 9.99999C18.3333 14.6024 14.6023 18.3333 9.99996 18.3333C5.39759 18.3333 1.66663 14.6024 1.66663 9.99999C1.66663 5.39762 5.39759 1.66666 9.99996 1.66666C14.6023 1.66666 18.3333 5.39762 18.3333 9.99999Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2202_31836">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
