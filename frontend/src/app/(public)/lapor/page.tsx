"use client";

import { useState } from "react";
import { Send, Search, CheckCircle2, AlertCircle, Loader2, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function LaporPage() {
  const [activeTab, setActiveTab] = useState<'lapor' | 'cek'>('lapor');
  
  // Lapor State
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [ticketId, setTicketId] = useState("");

  // Cek Status State
  const [checkLoading, setCheckLoading] = useState(false);
  const [checkTicketId, setCheckTicketId] = useState("");
  const [checkResult, setCheckResult] = useState<any>(null);
  const [checkError, setCheckError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/reports`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          category: formData.get('category'),
          message: formData.get('message'),
        })
      });

      if (!res.ok) {
        throw new Error('Gagal mengirim laporan.');
      }

      const data = await res.json();
      setTicketId(data.ticket_id);
      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || "Gagal mengirim laporan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!checkTicketId.trim()) return;
    
    setCheckLoading(true);
    setCheckError("");
    setCheckResult(null);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/reports/status/${checkTicketId}`);
      if (!res.ok) {
        throw new Error('Kode Tiket tidak ditemukan atau salah.');
      }
      const data = await res.json();
      setCheckResult(data.data);
    } catch (err: any) {
      setCheckError(err.message);
    } finally {
      setCheckLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full bg-white text-slate-900 pb-20">
      
      {/* Hero Section */}
      <section className="bg-slate-50 py-16 lg:py-24 border-b border-slate-100 relative overflow-hidden">
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-widest mb-6">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Layanan Pengaduan Terpadu</span>
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-slate-900 tracking-tight leading-tight mb-6">
            Kotak Suara <span className="text-blue-700 italic">Aman</span>
          </h1>
          
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Sampaikan keluhan, masukan, atau laporan kejadian di lingkungan sekolah. Identitas Anda dijamin kerahasiaannya.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 max-w-2xl -mt-8 relative z-20">
        
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="flex border-b border-slate-100">
            <button 
              onClick={() => setActiveTab('lapor')}
              className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'lapor' ? 'bg-white text-blue-700 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
            >
              Buat Laporan
            </button>
            <button 
              onClick={() => setActiveTab('cek')}
              className={`flex-1 py-4 px-6 text-sm font-bold uppercase tracking-wider transition-colors ${activeTab === 'cek' ? 'bg-white text-blue-700 border-b-2 border-blue-600' : 'bg-slate-50 text-slate-500 hover:text-slate-800'}`}
            >
              Cek Status
            </button>
          </div>

          <div className="p-6 sm:p-8">
            
            {activeTab === 'lapor' && (
              <div>
                {success ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Laporan Terkirim</h3>
                    <p className="text-sm text-slate-600 mb-6 max-w-sm mx-auto">Terima kasih atas laporan Anda. Simpan kode tiket di bawah ini untuk melacak tindak lanjut dari pihak sekolah secara anonim.</p>
                    
                    <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl max-w-sm mx-auto">
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Kode Tiket Rahasia</div>
                      <div className="text-2xl font-black text-slate-800 font-mono tracking-widest">{ticketId}</div>
                    </div>

                    <button 
                      onClick={() => setSuccess(false)}
                      className="mt-8 text-sm font-semibold text-blue-600 hover:text-blue-800 underline"
                    >
                      Kirim Laporan Baru
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {error && (
                      <div className="bg-rose-50 border border-rose-200 rounded-lg p-4 flex gap-3 text-rose-800 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}
                    
                    <div className="space-y-1.5">
                      <label htmlFor="category" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Kategori Laporan</label>
                      <select 
                        id="category" 
                        name="category" 
                        required 
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-700 font-medium"
                      >
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Fasilitas Rusak">Fasilitas Sekolah (Rusak / Kurang)</option>
                        <option value="Bullying">Perundungan (Bullying)</option>
                        <option value="Akademik">Sistem Akademik & Pembelajaran</option>
                        <option value="Saran & Kritik">Saran & Kritik Umum</option>
                        <option value="Lainnya">Lainnya</option>
                      </select>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Detail Laporan</label>
                      <textarea 
                        id="message" 
                        name="message" 
                        required 
                        rows={6}
                        placeholder="Ceritakan secara jelas dan detail apa yang ingin Anda laporkan..."
                        className="w-full px-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 resize-none text-slate-700"
                      ></textarea>
                    </div>
                    
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-bold py-3.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                    >
                      {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      <span>{loading ? 'Mengirim...' : 'Kirim Laporan Secara Anonim'}</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeTab === 'cek' && (
              <div>
                <form onSubmit={handleCheckStatus} className="mb-6">
                  <div className="space-y-1.5">
                    <label htmlFor="ticket_id" className="text-xs font-bold text-slate-700 uppercase tracking-wide">Masukkan Kode Tiket</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        id="ticket_id" 
                        value={checkTicketId}
                        onChange={(e) => setCheckTicketId(e.target.value.toUpperCase())}
                        required 
                        placeholder="Contoh: REP-ABCD1234"
                        className="w-full pl-4 pr-32 py-3.5 text-sm font-mono tracking-wider bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400 placeholder:font-sans uppercase text-slate-800"
                      />
                      <button 
                        type="submit"
                        disabled={checkLoading || !checkTicketId.trim()}
                        className="absolute right-1.5 top-1.5 bottom-1.5 px-4 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-70"
                      >
                        {checkLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                        <span>Cari</span>
                      </button>
                    </div>
                    {checkError && (
                      <p className="text-rose-600 text-xs mt-2 font-medium flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {checkError}
                      </p>
                    )}
                  </div>
                </form>

                {checkResult && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 animate-in fade-in slide-in-from-bottom-2">
                    <div className="flex items-start justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                      <div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Status Laporan</div>
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${
                            checkResult.status === 'Selesai' ? 'bg-emerald-500' :
                            checkResult.status === 'Proses' ? 'bg-amber-500' :
                            'bg-slate-400'
                          }`}></span>
                          <span className="text-lg font-black text-slate-900">{checkResult.status}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Dikirim Pada</div>
                        <div className="text-sm font-semibold text-slate-700">
                          {new Date(checkResult.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kategori Laporan</div>
                      <div className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 px-3 py-2 rounded-lg inline-block shadow-2xs">
                        {checkResult.category}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>

      </div>
    </div>
  );
}
