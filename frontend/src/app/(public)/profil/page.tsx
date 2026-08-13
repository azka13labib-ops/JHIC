import type { Metadata } from 'next';
import Image from 'next/image';
import { getSchoolProfile } from '@/lib/api/school';

export const metadata: Metadata = {
  title: 'Profil Sekolah | SMA PGRI 1 Lumajang',
  description: 'Profil lengkap SMA PGRI 1 Lumajang: visi, misi, sambutan kepala sekolah, sejarah, dan akreditasi.',
  openGraph: {
    title: 'Profil Sekolah | SMA PGRI 1 Lumajang',
    description: 'Mencetak generasi emas yang religius, cerdas, terampil, dan profesional.',
  },
};

export const revalidate = 86400;

export default async function ProfilPage() {
  const profile = await getSchoolProfile();

  const missions = profile.mission?.split('\n').filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-400 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            🏫 Profil Sekolah
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">{profile.name}</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg">{profile.description}</p>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3 text-center">
              <div className="text-2xl font-bold text-amber-400">A</div>
              <div className="text-xs text-blue-200 mt-1">Akreditasi</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3 text-center">
              <div className="text-2xl font-bold text-amber-400">1985</div>
              <div className="text-xs text-blue-200 mt-1">Berdiri Sejak</div>
            </div>
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-xl px-6 py-3 text-center">
              <div className="text-2xl font-bold text-amber-400">40+</div>
              <div className="text-xs text-blue-200 mt-1">Tahun Pengalaman</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl mb-4">🎯</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Visi</h2>
            <p className="text-slate-600 leading-relaxed">{profile.vision}</p>
          </div>
          <div className="bg-amber-50 rounded-2xl p-8 border border-amber-100">
            <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white text-xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Misi</h2>
            <ul className="space-y-3">
              {missions.map((m, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <span className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  <span>{m.replace(/^\d+\.\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sambutan Kepala Sekolah */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Sambutan Kepala Sekolah</h2>
          </div>
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-32 h-32 bg-gradient-to-br from-[#2B3B6F] to-blue-400 rounded-full flex items-center justify-center text-white text-5xl shadow-lg">
                👨‍🏫
              </div>
              <p className="text-center mt-3 font-bold text-slate-800 text-sm">{profile.principal_name}</p>
              <p className="text-center text-xs text-slate-500">Kepala Sekolah</p>
            </div>
            <div>
              <div className="text-4xl text-blue-200 font-serif mb-2">&ldquo;</div>
              <p className="text-slate-700 leading-relaxed text-lg italic">{profile.principal_message}</p>
              <div className="text-4xl text-blue-200 font-serif mt-2 text-right">&rdquo;</div>
            </div>
          </div>
        </div>

        {/* Kontak */}
        <div className="bg-[#1E2B58] text-white rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Informasi Kontak</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-2">📍</div>
              <h3 className="font-semibold mb-1">Alamat</h3>
              <p className="text-blue-200 text-sm">{profile.address}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold mb-1">Telepon</h3>
              <p className="text-blue-200 text-sm">{profile.phone}</p>
            </div>
            <div>
              <div className="text-3xl mb-2">✉️</div>
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-blue-200 text-sm">{profile.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
