'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { UploadCloud, Image as ImageIcon, X, RefreshCw, Sparkles, Zap, Loader2 } from 'lucide-react';
import { compressImageClient, formatBytes, CompressionResult } from '@/lib/image-compressor';

interface ImageUploadPreviewProps {
  currentImageUrl?: string | null;
  onChange: (file: File | null) => void;
  label?: string;
  helperText?: string;
  required?: boolean;
}

export function ImageUploadPreview({
  currentImageUrl,
  onChange,
  label = 'Foto / Gambar Thumbnail',
  helperText = 'Format JPG, PNG, atau WEBP (Maks. 10MB)',
  required = false,
}: ImageUploadPreviewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);
  const [compressionInfo, setCompressionInfo] = useState<CompressionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview from existing image
  useEffect(() => {
    if (currentImageUrl) {
      const fullUrl = currentImageUrl.startsWith('http')
        ? currentImageUrl
        : currentImageUrl.startsWith('/')
        ? currentImageUrl
        : `/${currentImageUrl}`;
      setPreviewUrl(fullUrl);
    }
  }, [currentImageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    // Pratinjau instan awal
    const tempUrl = URL.createObjectURL(rawFile);
    setPreviewUrl(tempUrl);
    setSelectedFileName(rawFile.name);

    // Otomatis kompresi di sisi client (0% beban server)
    try {
      setCompressing(true);
      const result = await compressImageClient(rawFile, 1920, 0.85);
      
      if (result.reductionPercentage > 0) {
        setCompressionInfo(result);
        onChange(result.file);
      } else {
        setCompressionInfo(null);
        onChange(rawFile);
      }
    } catch (err) {
      console.warn('Kompresi otomatis dilewati:', err);
      onChange(rawFile);
    } finally {
      setCompressing(false);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setSelectedFileName(null);
    setCompressionInfo(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onChange(null);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
        
        {/* Kompresi Otomatis Feature Tag */}
        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
          <Zap className="w-3 h-3 text-emerald-600" />
          <span>Kompresi Otomatis Aktif</span>
        </span>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />

      {previewUrl ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 overflow-hidden group space-y-2">
          <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-slate-200">
            <Image
              src={previewUrl}
              alt="Pratinjau Foto"
              fill
              className="object-cover object-center transition-transform duration-300 group-hover:scale-102"
              unoptimized
            />
            
            {/* Action Buttons Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-2xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-2 bg-white/90 hover:bg-white text-slate-900 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Ganti Foto</span>
              </button>
              <button
                type="button"
                onClick={handleRemove}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 transition-all cursor-pointer hover:scale-105"
              >
                <X className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            </div>

            {/* Compressing Spinner Badge */}
            {compressing && (
              <div className="absolute top-3 right-3 bg-slate-900/80 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 backdrop-blur-sm shadow-md animate-in fade-in">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                <span>Mengoptimalkan foto...</span>
              </div>
            )}
          </div>

          {/* Compression Result Stat Bar */}
          {compressionInfo && compressionInfo.reductionPercentage > 0 && (
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between">
              <div className="flex items-center gap-2 font-semibold">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Ukuran dioptimasi: <strong className="font-bold text-slate-800">{formatBytes(compressionInfo.originalSize)}</strong> → <strong className="font-bold text-emerald-700">{formatBytes(compressionInfo.compressedSize)}</strong>
                </span>
              </div>
              <span className="font-extrabold text-[11px] bg-emerald-600 text-white px-2 py-0.5 rounded-lg shadow-xs">
                Hemat {compressionInfo.reductionPercentage}%
              </span>
            </div>
          )}

          {/* Bottom File Info */}
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <div className="flex items-center gap-1.5 font-medium truncate max-w-xs">
              <ImageIcon className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{selectedFileName || 'Foto saat ini'}</span>
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-blue-600 hover:underline font-bold cursor-pointer shrink-0"
            >
              Ubah File
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50/60 hover:bg-blue-50/30 rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-blue-600 border border-slate-200 group-hover:border-blue-600 text-slate-400 group-hover:text-white flex items-center justify-center mx-auto shadow-xs transition-all duration-200 group-hover:scale-110">
            <UploadCloud className="w-6 h-6" />
          </div>
          <div className="mt-3 space-y-1">
            <span className="text-xs font-bold text-slate-800 group-hover:text-blue-600">
              Klik untuk unggah foto
            </span>
            <p className="text-[11px] text-slate-400">{helperText}</p>
            <span className="inline-block text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mt-1">
              ⚡ Foto besar (&gt;1 MB) otomatis dikompres tanpa mengurangi ketajaman
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
