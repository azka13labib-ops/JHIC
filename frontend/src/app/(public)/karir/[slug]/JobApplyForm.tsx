"use client";

import { useState } from "react";
import { applyJob } from "@/lib/api/school";
import { Send, CheckCircle2, AlertCircle, Loader2, Upload } from "lucide-react";

export default function JobApplyForm({ jobId, jobTitle }: { jobId: number, jobTitle: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB
        setError("Ukuran file CV maksimal 2MB (PDF).");
        setResumeFile(null);
        e.target.value = '';
        return;
      }
      setResumeFile(file);
      setError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await applyJob(jobId, formData);
      setSuccess(true);
      form.reset();
      setResumeFile(null);
    } catch (err: any) {
      setError(err.message || "Gagal mengirim lamaran. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm" id="apply-form">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Send className="w-4 h-4 text-blue-600" />
        Kirim Lamaran
      </h3>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 text-green-800">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Lamaran berhasil dikirim!</p>
            <p className="text-green-700/80 mt-1">Tim HRD akan mereview CV Anda dan menghubungi jika Anda memenuhi kualifikasi. Semoga sukses!</p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex gap-2 text-red-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="space-y-1.5">
            <label htmlFor="name" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Nama Lengkap</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              required 
              placeholder="Contoh: Budi Santoso"
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Email Aktif</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                required 
                placeholder="Contoh: budi@email.com"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="space-y-1.5">
              <label htmlFor="phone" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">No. WhatsApp</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                required 
                placeholder="Contoh: 081234567890"
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="resume" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Upload CV (PDF)</label>
            <div className="relative">
              <input 
                type="file" 
                id="resume" 
                name="resume" 
                accept="application/pdf"
                required 
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className={`w-full px-4 py-3 border-2 border-dashed rounded-lg flex items-center justify-between transition-colors ${resumeFile ? 'border-blue-300 bg-blue-50' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'}`}>
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${resumeFile ? 'bg-blue-200 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>
                    <Upload className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    {resumeFile ? (
                      <span className="text-sm font-semibold text-blue-700 truncate block">{resumeFile.name}</span>
                    ) : (
                      <span className="text-sm text-slate-500">Pilih file PDF...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Format PDF, maksimal 2MB.</p>
          </div>
          
          <div className="space-y-1.5">
            <label htmlFor="cover_letter" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Surat Lamaran / Pesan (Opsional)</label>
            <textarea 
              id="cover_letter" 
              name="cover_letter" 
              rows={4}
              placeholder="Ceritakan singkat mengapa Anda cocok untuk posisi ini..."
              className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none"
            ></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            <span>{loading ? 'Mengirim...' : 'Kirim Lamaran'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
