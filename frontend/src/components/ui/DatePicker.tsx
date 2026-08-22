'use client';

import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const classNames = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

interface DatePickerProps {
  value: string; // YYYY-MM-DD
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const DAYS_IN_WEEK = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];
const MONTHS = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function DatePicker({
  value,
  onChange,
  placeholder = 'Pilih Tanggal...',
  className = '',
  disabled = false,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize view date from value or current date
  const [viewDate, setViewDate] = useState(() => {
    if (value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) return d;
    }
    return new Date();
  });

  const toggleOpen = () => {
    if (!isOpen && value) {
      const d = new Date(value);
      if (!isNaN(d.getTime())) setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
    }
    setIsOpen(!isOpen);
  };

  // Handle outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (y: number, m: number) => new Date(y, m, 1).getDay();

  const handlePrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1));
  };
  const handleNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1));
  };

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const handleDateSelect = (day: number) => {
    const d = new Date(year, month, day);
    // Format YYYY-MM-DD
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    onChange(`${yyyy}-${mm}-${dd}`);
    setIsOpen(false);
  };

  const displayDate = value ? (() => {
    const d = new Date(value);
    if (isNaN(d.getTime())) return placeholder;
    return `${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
  })() : placeholder;

  return (
    <div className={classNames('relative', className)} ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className={classNames(
          'w-full flex items-center justify-between gap-2 px-3 py-1.5 text-xs font-bold bg-white border rounded-xl focus:outline-none transition-all',
          disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-50 border-slate-100 text-slate-400'
            : 'border-slate-200 text-slate-700 hover:border-slate-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500',
          isOpen && !disabled ? 'ring-2 ring-blue-500/20 border-blue-500' : ''
        )}
      >
        <span className="truncate">{displayDate}</span>
        <CalendarIcon className="w-3.5 h-3.5 shrink-0 text-slate-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-70 mt-1.5 p-4 bg-white border border-slate-100 rounded-xl shadow-xl shadow-slate-200/50 animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-sm font-bold text-slate-900">
              {MONTHS[month]} {year}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_IN_WEEK.map((d) => (
              <div key={d} className="text-center text-[10px] font-bold text-slate-400">
                {d}
              </div>
            ))}
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const cellDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = value === cellDate;
              const isToday = cellDate === new Date().toISOString().split('T')[0];

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleDateSelect(day)}
                  className={classNames(
                    'h-8 w-8 mx-auto flex items-center justify-center rounded-lg text-xs font-semibold transition-all',
                    isSelected
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : isToday
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
