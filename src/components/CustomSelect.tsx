import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface CustomSelectOption {
  label: string;
  value: string;
}

interface CustomSelectProps {
  id?: string;
  name?: string;
  label?: string;
  value: string;
  options: readonly (string | CustomSelectOption)[];
  placeholder?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export default function CustomSelect({
  id,
  name,
  label,
  value,
  options,
  placeholder = 'Select an option',
  onChange,
  error,
  disabled = false,
  className = '',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize options to { label, value }
  const normalizedOptions: CustomSelectOption[] = options.map((opt) =>
    typeof opt === 'string' ? { label: opt, value: opt } : opt
  );

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const nextIndex = currentIndex < normalizedOptions.length - 1 ? currentIndex + 1 : 0;
        onChange(normalizedOptions[nextIndex].value);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
      } else {
        const currentIndex = normalizedOptions.findIndex((opt) => opt.value === value);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : normalizedOptions.length - 1;
        onChange(normalizedOptions[prevIndex].value);
      }
    }
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {label && (
        <label
          htmlFor={id}
          className="block font-sans-body text-xs font-bold text-[#2C3D6C] mb-1.5"
        >
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`w-full bg-[#FDFEFE] border text-left rounded-xl px-3.5 py-2.5 text-xs font-sans-body flex items-center justify-between transition-all duration-200 focus:outline-hidden ${
          isOpen
            ? 'border-[#E31E24] ring-2 ring-[#E31E24]/15 shadow-sm'
            : error
            ? 'border-red-500'
            : 'border-[#E2E6EE] hover:border-[#2C3D6C]/40'
        } ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-50' : 'cursor-pointer'}`}
      >
        <span
          className={`truncate font-medium ${
            selectedOption ? 'text-[#2C3D6C]' : 'text-[#46516A]/60'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#2C3D6C]/60 shrink-0 ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-[#E31E24]' : ''
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute left-0 right-0 top-full mt-1.5 z-50 bg-white border border-[#E2E6EE] rounded-xl shadow-xl max-h-60 overflow-y-auto py-1 scrollbar-thin focus:outline-hidden"
            role="listbox"
          >
            {normalizedOptions.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 text-xs font-sans-body flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#E31E24]/10 text-[#E31E24] font-bold'
                      : 'text-[#2C3D6C] hover:bg-[#F7F9FC] hover:text-[#E31E24]'
                  }`}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#E31E24] shrink-0 ml-2" />}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {error && <p className="text-[10px] text-red-600 mt-1">{error}</p>}
    </div>
  );
}
