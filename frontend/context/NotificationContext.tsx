import { Notification } from '@frontend/components/common/Notification';
import React, { createContext, useContext, useRef, useState } from 'react';

type NotificationType = 'success' | 'error';

interface NotificationItem {
  id: number;
  text: string;
  type: NotificationType;
}

interface NotificationContextType {
  showNotification: (text: string, type: NotificationType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const nextIdRef = useRef(1);

  const showNotification = (text: string, type: NotificationType) => {
    const id = nextIdRef.current++;
    setNotifications((prevNotifications) => [...prevNotifications, { id, text, type }]);

    setTimeout(() => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id),
      );
    }, 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notifications.map((notification) => (
        <Notification key={notification.id} text={notification.text} type={notification.type} />
      ))}
    </NotificationContext.Provider>
  );
};
