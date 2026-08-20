'use client';

import { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { generateSlug } from '@/lib/utils';
import dynamic from 'next/dynamic';

const SimpleEditor = dynamic(() => import('@/components/admin/SimpleEditor'), { ssr: false });

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  job?: any;
}

export function JobFormModal({ isOpen, onClose, onSuccess, job }: JobFormModalProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Full-time');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [closingDate, setClosingDate] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (job) {
      setTitle(job.title || '');
      setSlug(job.slug || '');
      setCompanyName(job.company_name || '');
      setLocation(job.location || '');
      setType(job.type || 'Full-time');
      setDescription(job.description || '');
      setRequirements(job.requirements || '');
      setClosingDate(job.closing_date ? new Date(job.closing_date).toISOString().split('T')[0] : '');
      setIsActive(job.is_active ?? true);
    } else {
      setTitle('');
      setSlug('');
      setCompanyName('');
      setLocation('');
      setType('Full-time');
      setDescription('');
      setRequirements('');
      setClosingDate('');
      setIsActive(true);
    }
    setError('');
  }, [job, isOpen]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTitle(val);
    if (!job) {
      setSlug(generateSlug(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;

    setLoading(true);
    setError('');

    try {
      const data = {
        title,
        slug,
        company_name: companyName,
        location,
        type,
        description,
        requirements,
        closing_date: closingDate,
        is_active: isActive,
      };

      const url = job 
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs/${job.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/jobs`;

      const res = await fetch(url, {
        method: job ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Terjadi kesalahan saat menyimpan lowongan');
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {job ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <form id="jobForm" onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Posisi / Pekerjaan</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={handleTitleChange}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Perusahaan</label>
                <input 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Lokasi</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Jenis</label>
                <select 
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase">Batas Waktu</label>
                <input 
                  type="date" 
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Deskripsi Pekerjaan</label>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <SimpleEditor value={description} onChange={setDescription} placeholder="Tuliskan deskripsi pekerjaan..." />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase">Kualifikasi (Opsional)</label>
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <SimpleEditor value={requirements} onChange={setRequirements} placeholder="Tuliskan kualifikasi yang dibutuhkan..." />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input 
                type="checkbox" 
                id="isActive"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-slate-700">Tampilkan Lowongan (Aktif)</label>
            </div>
          </form>
        </div>

        <div className="p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3 mt-auto shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
          >
            Batal
          </button>
          <button 
            form="jobForm"
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-70"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Lowongan
          </button>
        </div>
      </div>
    </div>
  );
}
