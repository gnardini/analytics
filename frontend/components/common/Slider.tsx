import React from 'react';

interface SliderProps {
  id: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

export const Slider: React.FC<SliderProps> = ({
  id,
  min,
  max,
  step,
  value,
  onChange,
  className = '',
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(event.target.value));
  };

  return (
    <input
      type="range"
      id={id}
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={handleChange}
      className={`w-full h-2 bg-tertiary-background rounded-lg appearance-none cursor-pointer ${className}`}
    />
  );
};