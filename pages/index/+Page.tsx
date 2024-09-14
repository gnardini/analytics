import { LandingScreen } from '@frontend/components/landing/LandingScreen.jsx';
import { NotificationProvider } from '@frontend/context/NotificationContext.jsx';
import { LandingData } from 'pages/index/+data.js';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { user } = useData<LandingData>();

  return (
    <>
      <NotificationProvider>
        <LandingScreen user={user} />
      </NotificationProvider>
    </>
  );
}
