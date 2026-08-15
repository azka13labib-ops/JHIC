export interface Registration {
  id: number;
  registration_number: string;
  full_name: string;
  nisn: string;
  major_choice?: string;
  status: 'pending' | 'verified' | 'accepted' | 'rejected';
  previous_school: string;
  created_at: string;
  notes?: string;
}

export interface PpdbSettings {
  is_open: boolean;
  academic_year: string;
  registration_start: string;
  registration_end: string;
  announcement_date: string;
  closed_message: string;
}

export interface DashboardPpdbStats {
  total: number;
  pending: number;
  verified?: number;
  accepted: number;
  rejected: number;
}

export const STATUS_CONFIG: Record<string, { label: string; badge: string; dot: string }> = {
  pending:  { label: 'Menunggu', badge: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' },
  verified: { label: 'Terverifikasi', badge: 'bg-blue-50 text-blue-800 border-blue-200', dot: 'bg-blue-500' },
  accepted: { label: 'Diterima', badge: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' },
  rejected: { label: 'Ditolak', badge: 'bg-rose-50 text-rose-800 border-rose-200', dot: 'bg-rose-500' },
};

export const STATUS_OPTIONS = [
  { value: 'pending', label: 'Menunggu' },
  { value: 'verified', label: 'Terverifikasi' },
  { value: 'accepted', label: 'Diterima' },
  { value: 'rejected', label: 'Ditolak' },
];
