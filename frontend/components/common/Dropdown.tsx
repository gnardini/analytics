import { Label } from '@frontend/components/common/Label';
import { ChevronDown } from '@frontend/svgs/ChevronDown';
import { textSecondary } from '@frontend/utils/colors';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps<T> {
  options: T[];
  selectedOption: T | null;
  setSelectedOption: (option: T) => void;
  renderOption?: (option: T) => React.ReactNode;
  placeholder?: string;
  label?: string;
  bgColor?: string;
  className?: string;
}

export function Dropdown<T>({
  options,
  selectedOption,
  setSelectedOption,
  renderOption = (option) => <p>{String(option)}</p>,
  placeholder = 'Select an option',
  label,
  bgColor = 'bg-secondary-background',
  className = 'w-full sm:w-fit sm:min-w-[200px]',
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLUListElement>(null);
  const scrollThumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const optionsElement = optionsRef.current;
    const scrollThumbElement = scrollThumbRef.current;

    if (!optionsElement || !scrollThumbElement) return;

    const updateScrollThumb = () => {
      const { scrollTop, scrollHeight, clientHeight } = optionsElement;
      const scrollThumbHeight = (clientHeight / scrollHeight) * clientHeight;
      const scrollThumbTop = (scrollTop / scrollHeight) * clientHeight;

      scrollThumbElement.style.height = `${scrollThumbHeight}px`;
      scrollThumbElement.style.top = `${scrollThumbTop}px`;
    };

    optionsElement.addEventListener('scroll', updateScrollThumb);
    updateScrollThumb();

    return () => {
      optionsElement.removeEventListener('scroll', updateScrollThumb);
    };
  }, [isOpen]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && <Label>{label}</Label>}
      <div
        className={`${bgColor} text-text-primary p-2 rounded-md flex justify-between items-center cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {selectedOption ? (
          renderOption(selectedOption)
        ) : (
          <p className="text-text-secondary">{placeholder}</p>
        )}
        <ChevronDown
          color={textSecondary}
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
        />
      </div>

      <div className={`relative ${isOpen ? 'block' : 'hidden'}`}>
        <ul
          ref={optionsRef}
          className={`absolute z-10 w-full mt-1 ${bgColor} border border-gray-700 rounded-md shadow-lg max-h-60 overflow-y-scroll scrollbar-hide`}
          role="listbox"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              className={`p-2 cursor-pointer hover:bg-primary-accent hover:text-text-primary ${
                option === selectedOption ? `bg-primary-accent/80 text-text-primary` : ''
              }`}
              onClick={() => {
                setSelectedOption(option);
                setIsOpen(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedOption(option);
                  setIsOpen(false);
                }
              }}
              tabIndex={0}
              role="option"
              aria-selected={option === selectedOption}
            >
              {renderOption(option)}
            </li>
          ))}
        </ul>
        <div className="absolute right-0 top-0 w-[10px] h-screen max-h-60 bg-tertiary-background mt-1 rounded-full z-10">
          <div
            ref={scrollThumbRef}
            className="bg-primary-background/70 rounded-full cursor-pointer mt-[1px]"
            style={{ position: 'absolute', right: 1, width: '8px' }}
          />
        </div>
      </div>
    </div>
  );
}
