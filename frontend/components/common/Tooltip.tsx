import { HelpIcon } from '@frontend/svgs/HelpIcon';
import { useState } from 'react';

interface Props {
  isVisible?: boolean;
  text: string;
  className?: string;
}

export function Tooltip({ text, isVisible = true, className }: Props) {
  const [isShowing, setIsShowing] = useState(false);

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {isShowing && (
        <div
          className="fixed top-0 left-0 w-full h-full z-50"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsShowing(false);
          }}
        />
      )}
      <div className={`relative ${className}`}>
        <HelpIcon
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsShowing((s) => !s);
          }}
          className="cursor-pointer"
        />
        {isShowing && (
          <div
            className="absolute w-56 bg-white text-center text-gray-600 font-medium text-sm p-3 rounded-xl z-50 shadow-[0_4px_40px_0_rgba(0,0,0,0.04)]"
            style={{
              transform: 'translateX(-50%)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsShowing(false);
            }}
          >
            {text}
          </div>
        )}
      </div>
    </>
  );
}
