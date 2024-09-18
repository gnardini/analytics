import React from 'react';

interface FeatureBoxProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const FeatureBox: React.FC<FeatureBoxProps> = ({ icon, title, description }) => (
  <div className="bg-tertiary-background sm:bg-secondary-background px-2 py-4 sm:p-6 rounded-lg flex flex-col items-center text-center">
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-text-secondary">{description}</p>
  </div>
);