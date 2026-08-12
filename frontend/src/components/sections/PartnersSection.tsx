import type { Partner } from '@/types/school';
import Image from 'next/image';

export default function PartnersSection({ partners }: { partners: Partner[] }) {
  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Mitra Industri</h2>
          <p className="text-slate-600">
            Kurikulum kami disusun dan divalidasi langsung oleh perusahaan teknologi terkemuka di Indonesia.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              className="group relative w-40 h-20 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300"
            >
              {/* Note: Karena kita pakai dummy/belum ada gambar asli, kita pakai nama teks untuk logo fallback */}
              <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-800">
                {partner.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
