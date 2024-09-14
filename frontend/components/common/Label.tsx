import React from 'react';

interface LabelProps {
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, className, children }) => (
  <label htmlFor={htmlFor} className={`text-sm mb-[2px] font-medium block ${className}`}>
    {children}
  </label>
);
