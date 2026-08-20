"use client";

import { useState } from "react";
import { inquireProduct } from "@/lib/api/school";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function InquiryForm({ productId, productName }: { productId: number, productName: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message")
    };

    try {
      await inquireProduct(productId, data);
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setError(err.message || "Gagal mengirim pesan. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Send className="w-4 h-4 text-blue-600" />
        Kirim Pertanyaan
      </h3>
      
      {success ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3 text-green-800">
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm leading-relaxed">
            <p className="font-semibold">Pesan berhasil dikirim!</p>
            <p className="text-green-700/80 mt-1">Terima kasih atas ketertarikan Anda. Tim kami akan segera menghubungi Anda melalui kontak yang diberikan.</p>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            <label htmlFor="email" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Email</label>
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
            <label htmlFor="message" className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">Pesan</label>
            <textarea 
              id="message" 
              name="message" 
              required 
              rows={4}
              defaultValue={`Halo, saya tertarik dengan produk ${productName}. Bisa minta informasi lebih lanjut?`}
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
            <span>{loading ? 'Mengirim...' : 'Kirim Pertanyaan'}</span>
          </button>
        </form>
      )}
    </div>
  );
}
