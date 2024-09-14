import { Button } from '@frontend/components/common/Button';
import { useNotification } from '@frontend/context/NotificationContext';
import { useVerifyOrganizationSetupQuery } from '@frontend/queries/organizations/useVerifyOrganizationSetupQuery';
import { secondaryAccent } from '@frontend/utils/colors';
import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

interface SetupViewProps {
  domain: string;
  organizationId: string;
  onSetupComplete: () => void;
}

const SetupView: React.FC<SetupViewProps> = ({ domain, organizationId, onSetupComplete }) => {
  const { showNotification } = useNotification();
  const { execute: verifySetup, loading: verifyLoading } = useVerifyOrganizationSetupQuery();
  const [showError, setShowError] = useState(false);

  const scriptCode = `<script defer data-domain="${domain}" src="https://phinxer.com/script.js"></script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(scriptCode);
    showNotification('Copied to clipboard', 'success');
  };

  const handleSetupComplete = async () => {
    try {
      setShowError(false);
      const result = await verifySetup({ organizationId });
      if (result.success) {
        showNotification('Setup verified successfully!', 'success');
        onSetupComplete();
      } else {
        setShowError(true);
      }
    } catch (error) {
      showNotification('An error occurred during verification. Please try again.', 'error');
    }
  };

  return (
    <div className="bg-secondary-background p-6 rounded-lg">
      <p className="mb-4">
        You must paste this code into the &lt;head&gt; section of your site to start tracking usage.
      </p>
      <div
        onClick={handleCopy}
        className="bg-tertiary-background p-4 rounded-lg mb-4 flex flex-col cursor-pointer"
      >
        <code className="text-sm">{scriptCode}</code>
        <div className="flex items-center gap-1 mt-1">
          <p className="text-secondary-accent">COPY</p>
          <FaCopy color={secondaryAccent} />
        </div>
      </div>
      <Button onClick={handleSetupComplete} loading={verifyLoading}>
        {'I already did it!'}
      </Button>
      {showError && (
        <div className="mt-2">
          <p>Setup verification failed. Please check the script installation and try again.</p>
          <p>
            If the problem persists, join our Discord for support: https://discord.gg/aZJ7XY8Hx3
          </p>
        </div>
      )}
    </div>
  );
};

export default SetupView;
