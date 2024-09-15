import { Button } from '@frontend/components/common/Button';
import { FormInput } from '@frontend/components/common/FormInput';
import { useWelcomeSignUp } from '@frontend/queries/auth/useWelcomeSignUp';
import { useNotification } from '@frontend/context/NotificationContext';
import React, { useState } from 'react';
import { WelcomeData } from 'pages/welcome/+data';

interface WelcomeScreenProps {
  invitationDetails: WelcomeData;
}

export function WelcomeScreen({ invitationDetails }: WelcomeScreenProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { execute, loading, error } = useWelcomeSignUp();
  const { showNotification } = useNotification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showNotification('Passwords do not match', 'error');
      return;
    }

    try {
      await execute({ token: invitationDetails.token, password });
      showNotification('Welcome! Your account has been set up.', 'success');
      window.location.href = '/dashboard';
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-secondary-background rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome to {invitationDetails.organizationName}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={invitationDetails.email}
          onChange={() => {}}
          disabled
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {error && (
          <p className="text-error text-sm">{error}</p>
        )}
        <Button
          type="submit"
          loading={loading}
          className="w-full py-2 text-lg"
        >
          Complete Sign Up
        </Button>
      </form>
    </div>
  );
}