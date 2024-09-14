import { Modal } from '@frontend/components/common/Modal';
import { AuthForm } from './AuthForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const handleAuthSuccess = () => {
    window.location.href = `/dashboard`;
  };

  return (
    <Modal visible={isOpen} closeModal={onClose} extraClassName="w-[500px]">
      <h2 className="mb-4">Set up your account</h2>
      <AuthForm onAuthSuccess={handleAuthSuccess} initialState="signup" />
    </Modal>
  );
}
