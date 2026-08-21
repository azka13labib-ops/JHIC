'use client';

import React, { useState } from 'react';

// Data kumulatif pendaftar dummy per tahun
const yearlyData: Record<number, number[]> = {
  2023: [20, 80, 140, 200, 260, 310, 340],
  2024: [30, 95, 160, 250, 320, 380, 395],
  2025: [45, 120, 190, 280, 360, 410, 425],
  2026: [60, 150, 240, 350, 450, 520, 560],
};

export function PpdbTrendChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul'];
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  
  const currentData = yearlyData[selectedYear];
  const previousData = yearlyData[selectedYear - 1] || null;

  const maxData = 600; // Skala maksimal Y axis
  const width = 600;
  const height = 240;
  const paddingX = 40;
  const paddingY = 20;

  const [hoveredPoint, setHoveredPoint] = useState<{
    i: number;
    val: number;
    year: string;
    color: string;
  } | null>(null);

  // Transform value to SVG Y coordinate
  const getY = (value: number) => {
    return height - paddingY - (value / maxData) * (height - paddingY * 2);
  };

  // Transform index to SVG X coordinate
  const getX = (index: number) => {
    return paddingX + (index / (months.length - 1)) * (width - paddingX * 2);
  };

  const createPath = (data: number[]) => {
    return data.map((val, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(val)}`).join(' ');
  };

  const yGridLines = [0, 100, 200, 300, 400, 500, 600];
  const availableYears = [2023, 2024, 2025, 2026];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-bold text-sm text-slate-900">Perbandingan Tren Pendaftar Baru</h2>
          <span className="text-[11px] text-slate-500">
            Apakah jumlah pendaftar tahun {selectedYear} mengungguli tahun sebelumnya?
          </span>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-lg shrink-0">
          {availableYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                selectedYear === year 
                  ? 'bg-white text-blue-700 shadow-xs' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
              }`}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full aspect-[2/1] sm:aspect-[3/1] lg:aspect-[2.5/1]">
        
        {/* Hover Tooltip (HTML overlay) */}
        {hoveredPoint && (
          <div 
            className="absolute z-10 pointer-events-none bg-slate-900 text-white text-[11px] px-3 py-2 rounded-lg shadow-xl whitespace-nowrap transform -translate-x-1/2 -translate-y-[calc(100%+12px)] transition-all duration-75"
            style={{
              left: `${(getX(hoveredPoint.i) / width) * 100}%`,
              top: `${(getY(hoveredPoint.val) / height) * 100}%`,
            }}
          >
            {/* Tooltip Triangle */}
            <div className="absolute left-1/2 bottom-0 w-2 h-2 bg-slate-900 transform -translate-x-1/2 translate-y-1/2 rotate-45" />
            
            <div className="font-bold mb-1 border-b border-slate-700 pb-1">
              Bulan {months[hoveredPoint.i]} {hoveredPoint.year}
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredPoint.color }} />
              <span>{hoveredPoint.val} Pendaftar Baru</span>
            </div>
          </div>
        )}

        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible" preserveAspectRatio="none">
          {/* Grid Horizontal & Y-Axis Labels */}
          {yGridLines.map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={paddingX} y1={y} x2={width} y2={y} stroke="#f1f5f9" strokeWidth="1.5" />
                <text x={paddingX - 10} y={y + 4} textAnchor="end" className="fill-slate-400 text-[10px] font-medium">
                  {val}
                </text>
              </g>
            );
          })}

          {/* X-Axis Labels */}
          {months.map((month, i) => (
            <text key={month} x={getX(i)} y={height} textAnchor="middle" className="fill-slate-500 text-[10px] font-medium">
              {month}
            </text>
          ))}

          {/* Previous Year Line (Dashed) */}
          {previousData && (
            <>
              <path
                d={createPath(previousData)}
                fill="none"
                stroke="#94a3b8" // slate-400
                strokeWidth="2"
                strokeDasharray="4 4"
                className="transition-all duration-500"
              />
              {previousData.map((val, i) => {
                const yearStr = (selectedYear - 1).toString();
                const isHovered = hoveredPoint?.i === i && hoveredPoint?.year === yearStr;
                return (
                  <g key={`prev-${i}`}>
                    <circle cx={getX(i)} cy={getY(val)} r={isHovered ? "6" : "4"} fill="#ffffff" stroke="#94a3b8" strokeWidth={isHovered ? "3" : "2"} className="transition-all duration-200" />
                    <circle 
                      cx={getX(i)} cy={getY(val)} r="20" fill="transparent" className="cursor-pointer"
                      onMouseEnter={() => setHoveredPoint({ i, val, year: yearStr, color: '#94a3b8' })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  </g>
                );
              })}
            </>
          )}

          {/* Current Year Line (Solid Blue) */}
          <path
            d={createPath(currentData)}
            fill="none"
            stroke="#2563eb" // blue-600
            strokeWidth="3"
            className="transition-all duration-500"
          />
          {currentData.map((val, i) => {
            const yearStr = selectedYear.toString();
            const isHovered = hoveredPoint?.i === i && hoveredPoint?.year === yearStr;
            return (
              <g key={`curr-${i}`}>
                <circle cx={getX(i)} cy={getY(val)} r={isHovered ? "7" : "4.5"} fill="#ffffff" stroke="#2563eb" strokeWidth={isHovered ? "3.5" : "2.5"} className="transition-all duration-200" />
                <circle 
                  cx={getX(i)} cy={getY(val)} r="20" fill="transparent" className="cursor-pointer"
                  onMouseEnter={() => setHoveredPoint({ i, val, year: yearStr, color: '#3b82f6' })}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-[11px] font-semibold">
        {previousData && (
          <div className="flex items-center gap-2 text-slate-500">
            <span className="w-4 border-t-2 border-dashed border-slate-400 inline-block" />
            Tahun {selectedYear - 1}
          </div>
        )}
        <div className="flex items-center gap-2 text-blue-700">
          <span className="w-4 border-t-2 border-solid border-blue-600 inline-block" />
          Tahun {selectedYear}
        </div>
      </div>
    </div>
  );
}
