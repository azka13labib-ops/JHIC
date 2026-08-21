import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AlumniFormModalProps {
  isOpen: boolean;
  editingId: number | null;
  initialData: any;
  accessToken?: string;
  onClose: () => void;
  onSuccess: () => void;
  showToast: (type: 'success' | 'error' | 'info', text: string) => void;
}

export function AlumniFormModal({ isOpen, editingId, initialData, accessToken, onClose, onSuccess, showToast }: AlumniFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    graduation_year: '',
    major: '',
    current_job: '',
    company: '',
    testimonial: ''
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: initialData.name || '',
        graduation_year: initialData.graduation_year?.toString() || '',
        major: initialData.major || '',
        current_job: initialData.current_job || '',
        company: initialData.company || '',
        testimonial: initialData.testimonial || ''
      });
      setPhotoFile(null);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

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
          }, 'image/jpeg', 0.7);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) return;
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

      if (editingId) {
        submitData.append('_method', 'PUT');
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json'
        },
        body: submitData
      });
      
      if (res.ok) {
        onSuccess();
        onClose();
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-xl max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">
            {editingId ? 'Edit Data Alumni' : 'Tambah Data Alumni'}
          </h3>
          <button
            onClick={onClose}
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
            onClick={onClose}
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
  );
}
