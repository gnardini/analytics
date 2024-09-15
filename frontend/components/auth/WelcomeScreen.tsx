import { Button } from '@frontend/components/common/Button';
import { FormInput } from '@frontend/components/common/FormInput';
import { useNotification } from '@frontend/context/NotificationContext';
import { useWelcomeSignUp } from '@frontend/queries/auth/useWelcomeSignUp';
import { Invitation } from '@type/invitation';
import React, { useState } from 'react';

interface WelcomeScreenProps {
  token: string;
  invitationDetails: Invitation;
}

export function WelcomeScreen({ token, invitationDetails }: WelcomeScreenProps) {
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
      await execute({ token, password });
      showNotification('Welcome! Your account has been set up.', 'success');
      window.location.href = '/dashboard';
    } catch (error) {
      showNotification('An error occurred. Please try again.', 'error');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-secondary-background rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-secondary-accent">Welcome to Phinxer Analytics!</h2>
      <p className='mb-4'>You were invited by the team at {invitationDetails.organizationName}</p>
      <p className='mb-4'>Create an account to get started:</p>
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
        {error && <p className="text-error text-sm">{error}</p>}
        <Button loading={loading} className="w-full py-2 text-lg">
          Complete Sign Up
        </Button>
      </form>
    </div>
  );
}
