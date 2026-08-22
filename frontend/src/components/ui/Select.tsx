'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

const classNames = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

export interface SelectOption {
  value: string | number;
  label: React.ReactNode;
}

interface SelectProps {
  value: string | number;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  listClassName?: string;
  disabled?: boolean;
}

export function Select({
  value,
  onChange,
  options,
  placeholder = 'Pilih...',
  className = '',
  listClassName = '',
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  const selectedOption = options.find(
    (opt) => opt.value.toString() === value?.toString()
  );

  return (
    <div className={classNames('relative', className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={classNames(
          'w-full flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-bold bg-white border rounded-xl focus:outline-none transition-all',
          disabled 
            ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100 text-slate-400' 
            : 'border-slate-200 text-slate-700 hover:border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
          isOpen && !disabled ? 'ring-2 ring-blue-500/20 border-blue-500' : ''
        )}
      >
        <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        <ChevronDown 
          className={classNames(
            'w-3.5 h-3.5 shrink-0 transition-transform duration-200 text-slate-400', 
            isOpen ? 'rotate-180' : ''
          )} 
        />
      </button>

      {isOpen && (
        <div 
          className={classNames(
            'absolute z-50 w-full min-w-[140px] mt-1.5 py-1.5 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-100 overflow-hidden',
            listClassName
          )}
        >
          <div className="max-h-[250px] overflow-y-auto">
            {options.map((opt) => {
              const isSelected = opt.value.toString() === value?.toString();
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onChange(opt.value.toString());
                    setIsOpen(false);
                  }}
                  className={classNames(
                    'w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-left transition-colors',
                    isSelected 
                      ? 'bg-blue-50 text-blue-700' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <span className="truncate">{opt.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
