import React from 'react';

interface NotificationProps {
  text: string;
  type: 'success' | 'error';
}

export const Notification: React.FC<NotificationProps> = ({ text, type }) => {
  const bgColor = type === 'success' ? 'bg-success' : 'bg-error';

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-center p-4">
      <div
        className={`w-fit max-w-[90%] sm:max-w-[400px] px-4 py-2 rounded-md text-white ${bgColor} notification-animate`}
      >
        <p className="text-center">{text}</p>
      </div>
    </div>
  );
};