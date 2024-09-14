import { Input } from '@frontend/components/common/Input';
import { Label } from '@frontend/components/common/Label';
import React, { ReactNode } from 'react';

interface FormInputProps {
  id: string;
  label: string | ReactNode;
  type: string;
  value: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function FormInput({
  id,
  label,
  type,
  value,
  onChange,
  className,
  required = false,
}: FormInputProps) {
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} value={value} onChange={onChange} required={required} />
    </div>
  );
}
