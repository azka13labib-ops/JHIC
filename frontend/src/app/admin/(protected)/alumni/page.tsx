'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { GraduationCap, Briefcase, Building2, Eye, X } from 'lucide-react';
import { AdminPageHeader } from '@/components/admin/AdminPageHeader';
import { AdminSearchBar } from '@/components/admin/AdminSearchBar';
import { AdminPagination } from '@/components/admin/AdminPagination';
import { DeleteConfirmButton } from '@/components/admin/DeleteConfirmButton';
import { Pencil } from 'lucide-react';
import Image from 'next/image';

interface AlumniItem {
  id: number;
  name: string;
  graduation_year: number | string;
  major?: string;
  current_job?: string;
  company?: string;
  image_path?: string;
  testimonial?: string;
  created_at: string;
}

export default function AdminAlumniPage() {
  const { data: session } = useSession();
  const [alumniList, setAlumniList] = useState<AlumniItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniItem | null>(null);

  // Form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastAlert, setToastAlert] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error' | 'info', text: string) => {
    setToastAlert({ type, text });
    setTimeout(() => setToastAlert(null), 4000);
  };

  const [formData, setFormData] = useState({
    name: '',
    graduation_year: '',
    major: '',
    current_job: '',
    company: '',
    testimonial: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new window.Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
          
          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              resolve(compressedFile);
            } else {
              reject(new Error('Canvas to Blob failed'));
            }
          }, 'image/jpeg', 0.7); // 70% quality
        };
        img.onerror = (error) => reject(error);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('info', 'File terlalu besar. Mengompresi gambar...');
      }
      try {
        const compressed = await compressImage(file);
        setPhotoFile(compressed);
      } catch (err) {
        console.error('Compression error:', err);
        setPhotoFile(file); // fallback
      }
    } else {
      setPhotoFile(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      graduation_year: '',
      major: '',
      current_job: '',
      company: '',
      testimonial: ''
    });
    setPhotoFile(null);
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleEdit = (item: AlumniItem) => {
    setFormData({
      name: item.name || '',
      graduation_year: item.graduation_year?.toString() || '',
      major: item.major || '',
      current_job: item.current_job || '',
      company: item.company || '',
      testimonial: item.testimonial || ''
    });
    setPhotoFile(null);
    setEditingId(item.id);
    setIsFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.accessToken) return;
    setIsSubmitting(true);
    
    try {
      const url = editingId 
        ? `${process.env.NEXT_PUBLIC_API_URL}/admin/alumni/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/admin/alumni`;
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('graduation_year', formData.graduation_year);
      if (formData.major) submitData.append('major', formData.major);
      if (formData.current_job) submitData.append('current_job', formData.current_job);
      if (formData.company) submitData.append('company', formData.company);
      if (formData.testimonial) submitData.append('testimonial', formData.testimonial);
      if (photoFile) submitData.append('photo', photoFile);

      // In Laravel, PUT requests with FormData sometimes need _method=PUT
      if (editingId) {
        submitData.append('_method', 'PUT');
      }

      const res = await fetch(url, {
        method: 'POST', // Use POST and _method=PUT for FormData
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
          Accept: 'application/json'
        },
        body: submitData
      });
      
      if (res.ok) {
        fetchData();
        resetForm();
        showToast('success', 'Data alumni berhasil disimpan.');
      } else {
        showToast('error', 'Gagal menyimpan data alumni.');
      }
    } catch {
      showToast('error', 'Terjadi kesalahan jaringan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const authHeaders = useMemo(() => ({
    Authorization: `Bearer ${session?.accessToken}`,
    Accept: 'application/json',
  }), [session?.accessToken]);

  const fetchData = useCallback(async () => {
    if (!session?.accessToken) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/alumni`, { headers: authHeaders });
      const data = await res.json();
      setAlumniList(Array.isArray(data) ? data : data.data ?? []);
    } catch {
      setAlumniList([]);
    } finally {
      setLoading(false);
    }
  }, [session?.accessToken, authHeaders]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAlumni = useMemo(() => {
    if (!search.trim()) return alumniList;
    const q = search.toLowerCase();
    return alumniList.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.current_job && item.current_job.toLowerCase().includes(q)) ||
        (item.company && item.company.toLowerCase().includes(q)) ||
        (item.graduation_year && item.graduation_year.toString().includes(q)) ||
        (item.major && item.major.toLowerCase().includes(q))
    );
  }, [alumniList, search]);

  const totalPages = Math.ceil(filteredAlumni.length / perPage) || 1;
  const paginatedAlumni = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredAlumni.slice(start, start + perPage);
  }, [filteredAlumni, page, perPage]);

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AdminPageHeader
        icon={GraduationCap}
        title="Tracer Study Alumni"
        description="Kelola direktori alumni SMA PGRI 1 Lumajang, data karir, institusi kerja, dan testimoni lulusan."
        actionButton={{
          label: 'Tambah Data',
          onClick: () => setIsFormOpen(true)
        }}
      />

      {/* Table Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <AdminSearchBar
          value={search}
          onChange={handleSearchChange}
          placeholder="Cari nama alumni, profesi, instansi/perusahaan, atau tahun lulus..."
          totalResults={filteredAlumni.length}
        />

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 uppercase font-bold tracking-wider">
                <tr>
                  <th className="py-4 px-6">Nama Alumni</th>
                  <th className="py-4 px-6">Tahun Lulus</th>
                  <th className="py-4 px-6">Profesi / Jabatan</th>
                  <th className="py-4 px-6">Instansi / Perusahaan</th>
                  <th className="py-4 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {paginatedAlumni.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-slate-400">
                      {search ? 'Tidak ada alumni yang cocok dengan pencarian.' : 'Belum ada data tracer alumni yang terdaftar.'}
                    </td>
                  </tr>
                ) : (
                  paginatedAlumni.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 max-w-xs">
                        <div className="flex items-center gap-2">
                          {item.image_path ? (
                            <Image src={item.image_path} alt={item.name} width={32} height={32} className="w-8 h-8 rounded-full object-cover shadow-xs border border-slate-200 shrink-0" />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0">
                              {item.name ? item.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                          )}
                          <span className="truncate">{item.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 font-semibold border border-amber-100/80 text-[10px]">
                          Lulus {item.graduation_year || '-'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600">
                          <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.current_job || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.company || '-'}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedAlumni(item)}
                            className="p-2 text-slate-500 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Detail Alumni"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleEdit(item)}
                            className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                            title="Edit Data"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <DeleteConfirmButton
                            endpoint="/admin/alumni"
                            id={item.id}
                            title={item.name}
                            entityName="data alumni"
                            onDeleted={fetchData}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        <AdminPagination
          currentPage={page}
          totalPages={totalPages}
          itemsPerPage={perPage}
          totalItems={filteredAlumni.length}
          onPageChange={setPage}
          onItemsPerPageChange={(val: number) => {
            setPerPage(val);
            setPage(1);
          }}
        />
      </div>

      {/* Modal Detail Testimoni */}
      {selectedAlumni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Detail Tracer Alumni</h3>
              <button
                onClick={() => setSelectedAlumni(null)}
                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                {selectedAlumni.image_path ? (
                  <Image src={selectedAlumni.image_path} alt={selectedAlumni.name} width={64} height={64} className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-slate-200" />
                ) : (
                  <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-2xl">
                    {selectedAlumni.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{selectedAlumni.name}</h4>
                  <p className="text-slate-500">Angkatan / Tahun Lulus: {selectedAlumni.graduation_year}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Profesi</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.current_job || '-'}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Instansi / Kampus</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.company || '-'}</p>
                </div>
              </div>
              {selectedAlumni.major && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">Jurusan / Program Studi</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedAlumni.major}</p>
                </div>
              )}
              {selectedAlumni.testimonial && (
                <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100/60">
                  <span className="text-[10px] text-blue-600 font-bold uppercase">Kesan & Pesan Alumni</span>
                  <p className="text-slate-700 italic mt-1 leading-relaxed">&ldquo;{selectedAlumni.testimonial}&rdquo;</p>
                </div>
              )}
            </div>
            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedAlumni(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal (Create / Update) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                {editingId ? 'Edit Data Alumni' : 'Tambah Data Alumni'}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-white rounded-xl transition-colors shadow-sm border border-transparent hover:border-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="alumni-form" onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap <span className="text-rose-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                      placeholder="Contoh: Budi Santoso, S.Kom"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Foto Profil (Maks 2MB)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Tahun Lulus <span className="text-rose-500">*</span></label>
                    <input
                      type="number"
                      required
                      min="2000"
                      max="2100"
                      value={formData.graduation_year}
                      onChange={(e) => setFormData({ ...formData, graduation_year: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                      placeholder="Contoh: 2020"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Jurusan Semasa SMA</label>
                    <input
                      type="text"
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                      placeholder="Contoh: IPA / IPS"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Profesi / Jabatan Saat Ini</label>
                  <input
                    type="text"
                    value={formData.current_job}
                    onChange={(e) => setFormData({ ...formData, current_job: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                    placeholder="Contoh: Software Engineer, Mahasiswa, dsb"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Instansi / Perusahaan / Kampus</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700"
                    placeholder="Contoh: PT Teknologi Nusantara / Universitas Brawijaya"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide">Testimoni (Opsional)</label>
                  <textarea
                    rows={3}
                    value={formData.testimonial}
                    onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                    className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-slate-700"
                    placeholder="Kesan dan pesan selama bersekolah..."
                  />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3 mt-auto">
              <button
                type="button"
                onClick={resetForm}
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:border-slate-300 rounded-xl transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="submit"
                form="alumni-form"
                disabled={isSubmitting}
                className="px-6 py-2.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-xs transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Alert toast banner */}
      {toastAlert && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-5 ${
            toastAlert.type === 'success' 
            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
            : toastAlert.type === 'info'
            ? 'bg-blue-50 text-blue-700 border border-blue-200'
            : 'bg-rose-50 text-rose-700 border border-rose-200'
          }`}>
          <span className="text-sm font-semibold">{toastAlert.text}</span>
          <button 
            onClick={() => setToastAlert(null)}
            className="text-slate-400 hover:text-slate-600 transition-colors ml-2"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
