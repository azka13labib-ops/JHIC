import type { Metadata } from 'next';
import Image from 'next/image';
import { getSchoolProfile, getPartners } from '@/lib/api/school';

export const metadata: Metadata = {
  title: 'Profil Sekolah | SMA PGRI 1 Lumajang',
  description: 'Profil lengkap SMA PGRI 1 Lumajang: visi, misi, sambutan kepala sekolah, sejarah, dan kemitraan.',
  openGraph: {
    title: 'Profil Sekolah | SMA PGRI 1 Lumajang',
    description: 'Mencetak generasi emas yang religius, cerdas, terampil, dan profesional.',
  },
};

export const revalidate = 86400;

export default async function ProfilPage() {
  const profile = await getSchoolProfile();
  const partners = await getPartners();

  const missions = profile.mission?.split('\n').filter(Boolean) ?? [];

  const facilities = [
    { name: 'Lab. Komputer Standar Industri', icon: '💻' },
    { name: 'Perpustakaan Digital', icon: '📚' },
    { name: 'Bengkel Teaching Factory', icon: '🛠️' },
    { name: 'Lapangan Olahraga', icon: '⚽' },
    { name: 'Ruang Kelas Full AC & Proyektor', icon: '🏫' },
    { name: 'Masjid Jami\' Sekolah', icon: '🕌' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. Hero Section */}
      <section className="relative bg-linear-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            🏫 Profil Sekolah
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">{profile.name}</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">{profile.description}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-4 text-center min-w-32 shadow-sm">
              <div className="text-3xl font-black text-amber-400">A</div>
              <div className="text-xs font-semibold text-blue-100 mt-2 uppercase tracking-wider">Akreditasi</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-4 text-center min-w-32 shadow-sm">
              <div className="text-3xl font-black text-amber-400">1985</div>
              <div className="text-xs font-semibold text-blue-100 mt-2 uppercase tracking-wider">Berdiri Sejak</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-4 text-center min-w-32 shadow-sm">
              <div className="text-3xl font-black text-amber-400">40+</div>
              <div className="text-xs font-semibold text-blue-100 mt-2 uppercase tracking-wider">Thn Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Sambutan Kepala Sekolah */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-linear-to-br from-slate-50 to-blue-50/50 rounded-3xl p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row gap-10 items-center shadow-xs">
            <div className="shrink-0 flex flex-col items-center">
              <div className="w-40 h-40 bg-linear-to-br from-[#2B3B6F] to-blue-500 rounded-full flex items-center justify-center text-white text-6xl shadow-xl ring-4 ring-white">
                👨‍🏫
              </div>
              <p className="text-center mt-5 font-bold text-slate-800 text-lg">{profile.principal_name}</p>
              <p className="text-center text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full mt-1">Kepala Sekolah</p>
            </div>
            <div className="flex-1 relative">
              <div className="absolute -top-6 -left-4 text-6xl text-blue-200/50 font-serif leading-none">&ldquo;</div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 relative z-10">Sambutan Kepala Sekolah</h2>
              <p className="text-slate-600 leading-relaxed text-lg italic relative z-10">
                &quot;{profile.principal_message}&quot;
              </p>
              <div className="absolute -bottom-10 right-0 text-6xl text-blue-200/50 font-serif leading-none">&rdquo;</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sejarah Singkat */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Sejarah Singkat</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Perjalanan panjang kami dalam mendedikasikan diri untuk pendidikan anak bangsa.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative border-l-4 border-blue-200 ml-3 md:ml-1/2">
              <div className="mb-10 ml-8 relative">
                <div className="absolute -left-10.5 top-1 w-6 h-6 bg-blue-600 rounded-full border-4 border-slate-50" />
                <h3 className="text-xl font-bold text-[#1E2B58]">Didirikan (1985)</h3>
                <p className="text-slate-600 mt-2">Berdiri sebagai bentuk kepedulian yayasan PGRI terhadap pendidikan menengah di wilayah Lumajang.</p>
              </div>
              <div className="mb-10 ml-8 relative">
                <div className="absolute -left-10.5 top-1 w-6 h-6 bg-amber-500 rounded-full border-4 border-slate-50" />
                <h3 className="text-xl font-bold text-[#1E2B58]">Status Disamakan (1995)</h3>
                <p className="text-slate-600 mt-2">Mendapatkan status prestisius dari pemerintah yang menunjukkan kualitas pendidikan yang setara dengan sekolah negeri terbaik.</p>
              </div>
              <div className="ml-8 relative">
                <div className="absolute -left-10.5 top-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-slate-50" />
                <h3 className="text-xl font-bold text-[#1E2B58]">Transformasi Digital (Kini)</h3>
                <p className="text-slate-600 mt-2">Menjadi salah satu sekolah pelopor pendidikan berbasis digital dan kewirausahaan (Teaching Factory) di Lumajang.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Visi & Misi */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-600 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -right-10 -top-10 text-9xl opacity-10 group-hover:rotate-12 transition-transform duration-500">🎯</div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-6 backdrop-blur">🎯</div>
              <h2 className="text-3xl font-extrabold mb-4">Visi Kami</h2>
              <p className="text-blue-50 text-lg leading-relaxed font-medium">{profile.vision}</p>
            </div>
            
            <div className="bg-amber-400 rounded-3xl p-10 text-slate-900 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
              <div className="absolute -right-10 -top-10 text-9xl opacity-10 group-hover:-rotate-12 transition-transform duration-500">🚀</div>
              <div className="w-16 h-16 bg-black/10 rounded-2xl flex items-center justify-center text-3xl mb-6 backdrop-blur">🚀</div>
              <h2 className="text-3xl font-extrabold mb-6">Misi Kami</h2>
              <ul className="space-y-4">
                {missions.map((m, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-slate-900 rounded-full flex items-center justify-center text-amber-400 text-sm font-black shrink-0 mt-0.5">{i + 1}</span>
                    <span className="font-medium text-slate-800 leading-relaxed">{m.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sarana & Prasarana */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-2 text-sm font-bold mb-4">
            🏢 Fasilitas Terbaik
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Sarana & Prasarana</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {facilities.map((fac, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow hover:border-blue-200 group">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{fac.icon}</div>
                <h3 className="font-semibold text-slate-800">{fac.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Kemitraan */}
      {partners.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-100">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Kemitraan & Industri</h2>
            <p className="text-slate-500 mb-12 max-w-2xl mx-auto">Bekerjasama dengan berbagai instansi dan perusahaan terkemuka untuk memastikan lulusan kami siap bersaing di dunia kerja.</p>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-70">
              {partners.map((partner) => (
                <div key={partner.id} className="w-32 h-20 relative grayscale hover:grayscale-0 transition-all duration-300">
                  {partner.logo_url ? (
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-slate-400 bg-slate-100 rounded-lg">
                      {partner.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Kontak & CTA */}
      <section className="py-20 bg-[#1E2B58] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-10">Kunjungi Sekolah Kami</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-4">📍</div>
                <h3 className="font-bold text-lg mb-2 text-amber-400">Alamat</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{profile.address}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="font-bold text-lg mb-2 text-amber-400">Telepon</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{profile.phone}</p>
              </div>
              <div className="bg-white/10 p-6 rounded-2xl backdrop-blur border border-white/10 hover:bg-white/20 transition-colors">
                <div className="text-4xl mb-4">✉️</div>
                <h3 className="font-bold text-lg mb-2 text-amber-400">Email</h3>
                <p className="text-blue-100 text-sm leading-relaxed">{profile.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
