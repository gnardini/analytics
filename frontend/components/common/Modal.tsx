import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  visible: boolean;
  closeModal?: () => void;
  className?: string;
  extraClassName?: string;
  children: ReactNode;
  closeOnBackgroundTouch?: boolean;
  testId?: string;
}

export function Modal({
  visible,
  closeModal,
  children,
  className = 'max-w-[90%] md:max-w-[600px] max-h-[90%] p-3 md:p-8',
  extraClassName = '',
  closeOnBackgroundTouch = true,
  testId,
}: Props) {
  if (!visible) return null;

  const onBackgroundTouched = () => {
    if (closeOnBackgroundTouch) {
      closeModal?.();
    }
  };

  return createPortal(
    <>
      <div
        className={`fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40 bg-gray-900 opacity-90`}
      />
      <div
        aria-modal
        aria-hidden
        role="dialog"
        className={`fixed top-0 bottom-0 left-0 right-0 w-screen h-screen z-40`}
        onClick={onBackgroundTouched}
        data-testid={testId}
      >
        <div
          className={`bg-secondary-background rounded-xl relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${className} ${extraClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>,
    document.getElementsByTagName('body')[0],
  );
}
