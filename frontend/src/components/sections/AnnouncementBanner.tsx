import React from 'react';
import Link from 'next/link';

interface AnnouncementItem {
  id: number;
  badge_text: string | null;
  title: string;
  description: string;
  button_text: string | null;
  button_url: string | null;
  event_date: string | null;
  created_at: string;
}

interface AnnouncementBannerProps {
  announcements: AnnouncementItem[];
}

export default function AnnouncementBanner({ announcements }: AnnouncementBannerProps) {
  if (!announcements || announcements.length === 0) return null;

  // We only show the latest active announcement (the first one)
  const announcement = announcements[0];

  let month = "JAN";
  let day = "01";
  
  if (announcement.event_date) {
    const d = new Date(announcement.event_date);
    month = d.toLocaleDateString('id-ID', { month: 'short' }).toUpperCase();
    day = d.toLocaleDateString('id-ID', { day: '2-digit' });
  }

  // Calculate time ago
  const calcTimeAgo = (dateStr: string) => {
    const diff = new Date().getTime() - new Date(dateStr).getTime();
    const days = Math.floor(diff / (1000 * 3600 * 24));
    if (days === 0) return 'Hari ini';
    if (days < 30) return `${days} hari yang lalu`;
    const months = Math.floor(days / 30);
    return `${months} bulan yang lalu`;
  };

  const timeAgo = calcTimeAgo(announcement.created_at);

  return (
    <section className="py-8 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-2xl p-6 shadow-lg flex flex-col md:flex-row items-center gap-6">
          
          {/* Left: Date Calendar */}
          {announcement.event_date && (
            <div className="shrink-0 bg-white text-blue-600 rounded-xl p-3 w-20 flex flex-col items-center justify-center shadow-sm">
              <span className="text-xs font-bold uppercase">{month}</span>
              <span className="text-2xl font-black">{day}</span>
            </div>
          )}

          {/* Center: Content */}
          <div className="flex-1 text-white text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2 justify-center md:justify-start">
              {announcement.badge_text && (
                <span className="px-3 py-1 bg-white/20 text-xs font-bold rounded-full">
                  {announcement.badge_text}
                </span>
              )}
              <h3 className="text-lg md:text-xl font-bold">{announcement.title}</h3>
            </div>
            <p className="text-blue-100 text-sm line-clamp-2 md:line-clamp-1">
              {announcement.description}
            </p>
          </div>

          {/* Right: Action */}
          <div className="shrink-0 flex flex-col items-center md:items-end gap-3 w-full md:w-auto mt-4 md:mt-0">
            <span className="text-blue-200 text-xs font-medium">
              {timeAgo}
            </span>
            {announcement.button_text && announcement.button_url && (
              <Link 
                href={announcement.button_url}
                className="bg-white text-blue-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-50 transition-colors shadow-sm w-full md:w-auto text-center"
              >
                {announcement.button_text}
              </Link>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
