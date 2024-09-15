import React from 'react';

interface InputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
}

export const Input: React.FC<InputProps> = ({ id, type, value, onChange, disabled, required = false }) => (
  <input
    type={type}
    id={id}
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    className="w-full py-1 px-1 bg-tertiary-background text-text-primary rounded-md border-2 border-transparent focus:border-primary-accent focus:outline-none shadow-sm"
  />
);