import { HTMLAttributes, ReactNode } from 'react';

type Props = {
  className?: string;
  children: ReactNode;
  hideBorder?: boolean;
  hideBackground?: boolean;
  innerRef?: any;
  testId?: string;
} & HTMLAttributes<HTMLDivElement>;

export function Card({
  children,
  className = 'p-3',
  hideBorder = true,
  hideBackground = false,
  innerRef,
  testId,
  ...props
}: Props) {
  return (
    <div
      className={`${hideBackground ? '' : 'bg-secondary-background'} ${
        className.includes('rounded') ? '' : 'rounded-xl'
      } ${hideBorder ? '' : 'border-[1.5px]'} ${
        className.includes('border-') ? '' : 'border-gray-100'
      }	${className}`}
      {...props}
      ref={innerRef}
    >
      {children}
    </div>
  );
}
