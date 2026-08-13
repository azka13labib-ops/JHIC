'use client';

import React from 'react';
import * as LucideIcons from 'lucide-react';
import Link from 'next/link';

interface FeatureItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  link_text: string | null;
  link_url: string | null;
  sort_order: number;
}

interface FeaturesSectionProps {
  features: FeatureItem[];
}

export default function FeaturesSection({ features }: FeaturesSectionProps) {
  if (!features || features.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            // Retrieve dynamic icon from lucide-react
            const IconComponent = (LucideIcons as any)[feature.icon] || LucideIcons.CheckCircle;
            const numberWatermark = String(index + 1).padStart(2, '0');

            return (
              <div 
                key={feature.id}
                className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-100 overflow-hidden group"
              >
                {/* Watermark Number */}
                <div className="absolute -right-4 -bottom-8 text-8xl font-black text-slate-50 select-none group-hover:scale-110 group-hover:-translate-y-2 group-hover:text-slate-100 transition-all duration-300">
                  {numberWatermark}
                </div>

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-6 line-clamp-3">
                    {feature.description}
                  </p>

                  {feature.link_text && feature.link_url && (
                    <Link 
                      href={feature.link_url}
                      className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {feature.link_text}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
