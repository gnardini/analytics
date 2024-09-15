import { WelcomeScreen } from '@frontend/components/welcome/WelcomeScreen';
import { NotificationProvider } from '@frontend/context/NotificationContext';
import { WelcomeData } from 'pages/welcome/+data';
import { useData } from 'vike-react/useData';

export default function Page() {
  const invitationDetails = useData<WelcomeData>();

  return (
    <NotificationProvider>
      <WelcomeScreen invitationDetails={invitationDetails} />
    </NotificationProvider>
  );
}