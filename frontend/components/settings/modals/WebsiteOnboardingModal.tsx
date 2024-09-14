import { Button, ButtonType } from '@frontend/components/common/Button';
import { FormInput } from '@frontend/components/common/FormInput';
import { Label } from '@frontend/components/common/Label';
import { Modal } from '@frontend/components/common/Modal';
import { useAuth } from '@frontend/context/AuthContext';
import { useCreateOrgQuery } from '@frontend/queries/organizations/useCreateOrgQuery';
import { useState } from 'react';

interface Props {
  visible: boolean;
  closeModal: () => void;
}

export function WebsiteOnboardingModal({ visible, closeModal }: Props) {
  const [domain, setDomain] = useState('');
  const [error, setError] = useState('');
  const { execute, loading } = useCreateOrgQuery();
  const { addOrganization } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    let processedDomain = domain.replace('https://', '').replace('http://', '');
    processedDomain = processedDomain.endsWith('/')
      ? processedDomain.slice(0, -1)
      : processedDomain;

    if (!isValidDomain(processedDomain)) {
      setError('Please enter a valid domain name (e.g., example.com)');
      return;
    }

    try {
      const { organization } = await execute({ name: processedDomain });
      addOrganization(organization);
      window.location.href = `/dashboard`;
    } catch (err) {
      setError('Failed to create organization. Please try again.');
    }
  };

  const isValidDomain = (domain: string) => {
    const domainRegex = /^([a-zA-Z0-9]+(-[a-zA-Z0-9]+)*\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(domain);
  };

  return (
    <Modal visible={visible} closeModal={closeModal}>
      <h2 className="text-2xl font-bold mb-4 text-secondary-accent">Add Website</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="domain"
          label={
            <div>
              <Label>Domain Name</Label>
              <p className="text-sm text-text-secondary">
                Just the domain, like "example.com" Don't include www. or https://
              </p>
            </div>
          }
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          required
          className="mb-4"
        />
        {error && <p className="text-error mb-4">{error}</p>}
        <Button type={ButtonType.Primary} className="w-full py-2" loading={loading}>
          Add Website
        </Button>
      </form>
    </Modal>
  );
}
