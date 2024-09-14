import { Button, ButtonType } from '@frontend/components/common/Button';
import { Container } from '@frontend/components/common/Container';
import { Tab } from '@type/tabs';
import { useState } from 'react';
import { WebsiteOnboardingModal } from './modals/WebsiteOnboardingModal';

interface Props {}

export function SettingsScreen({}: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container activeTab={Tab.Settings} showSideBar={false}>
      <h1>Settings</h1>
      <Button type={ButtonType.Primary} onClick={() => setIsModalOpen(true)} className="mt-4 p-3">
        Add website
      </Button>
      <WebsiteOnboardingModal visible={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </Container>
  );
}
