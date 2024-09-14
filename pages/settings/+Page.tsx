import { SettingsScreen } from '@frontend/components/settings/SettingsScreen';
import { AuthProvider } from '@frontend/context/AuthContext';
import { NotificationProvider } from '@frontend/context/NotificationContext';
import { SettingsData } from 'pages/settings/+data';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { organizations, activeOrg, user } = useData<SettingsData>();

  return (
    <>
      <NotificationProvider>
        <AuthProvider user={user} organizations={organizations} activeOrg={activeOrg}>
          <SettingsScreen />
        </AuthProvider>
      </NotificationProvider>
    </>
  );
}
