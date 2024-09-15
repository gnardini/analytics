import DashboardScreen from '@frontend/components/dashboard/DashboardScreen';
import { AuthProvider } from '@frontend/context/AuthContext';
import { NotificationProvider } from '@frontend/context/NotificationContext';
import { DashboardData } from 'pages/dashboard/+data';
import { useData } from 'vike-react/useData';

export default function Page() {
  const { organizations, activeOrg, membershipType, user } = useData<DashboardData>();

  return (
    <>
      <NotificationProvider>
        <AuthProvider user={user} organizations={organizations} activeOrg={activeOrg}>
          <DashboardScreen activeOrg={activeOrg} membershipType={membershipType} />
        </AuthProvider>
      </NotificationProvider>
    </>
  );
}
