import { Button } from '@frontend/components/common/Button';
import { FormInput } from '@frontend/components/common/FormInput';
import { useLogInQuery } from '@frontend/queries/auth/useLogInQuery';
import { useSignUpQuery } from '@frontend/queries/auth/useSignUpQuery';
import React, { useState } from 'react';

interface AuthFormProps {
  onAuthSuccess: () => void;
  initialState: 'login' | 'signup';
}

export function AuthForm({ onAuthSuccess, initialState }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authState, setAuthState] = useState<'login' | 'signup'>(initialState);

  const { execute: executeLogin, loading: loginLoading, error: loginError } = useLogInQuery();
  const { execute: executeSignup, loading: signupLoading, error: signupError } = useSignUpQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authState === 'login') {
      await executeLogin({ email, password });
    } else {
      await executeSignup({ email, password });
    }
    onAuthSuccess();
  };

  const toggleAuthState = () => {
    setAuthState(authState === 'login' ? 'signup' : 'login');
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <FormInput
        id="email"
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormInput
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {(loginError || signupError) && (
        <p className="text-error text-sm mb-4">
          Authentication failed. Please check your credentials and try again.
        </p>
      )}
      <div className="flex flex-col gap-4 mt-2">
        <Button
          onClick={handleSubmit}
          loading={authState === 'login' ? loginLoading : signupLoading}
          className="w-full py-2 text-lg"
        >
          {authState === 'login' ? 'Log In' : 'Sign Up'}
        </Button>
        <p className="text-center text-sm">
          {authState === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <span
            className="text-secondary-accent cursor-pointer underline"
            onClick={toggleAuthState}
          >
            {authState === 'login' ? 'Sign up instead' : 'Log in instead'}
          </span>
        </p>
      </div>
    </div>
  );
}
