import { Loader } from '@frontend/components/common/Loader';
import { gray0 } from '@frontend/utils/colors';
import { HTMLAttributes, ReactNode } from 'react';

export enum ButtonType {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Warning = 'Warning',
}

type Props = {
  type?: ButtonType;
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  href?: string | null;
  testId?: string;
} & HTMLAttributes<HTMLElement>;

const LOADER_COLORS: Record<ButtonType, string> = {
  [ButtonType.Primary]: gray0,
  [ButtonType.Secondary]: gray0,
  [ButtonType.Warning]: gray0,
};

export function Button({
  children,
  type = ButtonType.Primary,
  className = 'w-fit h-fit py-2 px-3',
  disabled = false,
  loading = false,
  href = null,
  onClick,
  testId,
  ...props
}: Props) {
  let buttonStyle = '';
  switch (type) {
    case ButtonType.Primary:
      buttonStyle = disabled
        ? `bg-primary-accent/40 text-gray-400`
        : `bg-primary-accent hover:bg-secondary-accent text-text-primary`;
      break;
    case ButtonType.Secondary:
      buttonStyle =
        'border ' +
        (disabled
          ? `border-primary-accent/40 bg-primary-background/40 text-gray-400`
          : `border-primary-accent bg-primary-background hover:bg-secondary-background/80 text-text-primary`);
      break;
    case ButtonType.Warning:
      buttonStyle = disabled
        ? 'bg-error/40 text-gray-400'
        : 'bg-error text-text-primary hover:bg-error/80';
      break;
  }
  const BaseComponent = href ? 'a' : 'button';
  return (
    <BaseComponent
      className={`${buttonStyle} rounded-lg font-medium ${
        disabled ? 'cursor-not-allowed' : 'cursor-pointer'
      } ${className.includes('absolute') ? '' : 'relative'} ${
        loading ? 'button-loading' : ''
      } ${className}`}
      disabled={disabled}
      href={href ?? ''}
      onClick={(e) => {
        if (disabled) {
          return;
        }
        onClick?.(e);
      }}
      {...props}
    >
      <span className={loading ? 'invisible' : 'visible'}>{children}</span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader size={16} color={LOADER_COLORS[type]} />
        </span>
      )}
    </BaseComponent>
  );
}
