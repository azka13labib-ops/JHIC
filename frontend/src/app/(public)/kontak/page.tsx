import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Hubungi Kami | SMA PGRI 1 Lumajang',
  description: 'Hubungi SMA PGRI 1 Lumajang melalui formulir kontak, telepon, atau kunjungi kami langsung di Lumajang, Jawa Timur.',
};

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-linear-to-br from-[#1E2B58] to-[#2B3B6F] text-white py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-sm mb-6">
            📬 Hubungi Kami
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">Ada Pertanyaan?</h1>
          <p className="text-blue-200 max-w-xl mx-auto text-lg">
            Tim kami siap membantu. Kirim pesan atau datang langsung ke sekolah kami.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulir Kontak */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Kirim Pesan</h2>
            <ContactForm />
          </div>

          {/* Info Kontak */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Informasi Kontak</h2>
            {[
              {
                icon: '📍',
                title: 'Alamat',
                content: 'Jl. Contoh Alamat No. 123, Lumajang, Jawa Timur 67316',
                link: 'https://maps.google.com/?q=Lumajang+Jawa+Timur',
                linkText: 'Lihat di Google Maps →',
              },
              {
                icon: '📞',
                title: 'Telepon',
                content: '(0334) 881234',
                link: 'tel:+62334881234',
                linkText: 'Hubungi sekarang',
              },
              {
                icon: '✉️',
                title: 'Email',
                content: 'info@smapgri1lmj.sch.id',
                link: 'mailto:info@smapgri1lmj.sch.id',
                linkText: 'Kirim email',
              },
              {
                icon: '🕒',
                title: 'Jam Operasional',
                content: 'Senin – Jumat: 07.00 – 15.00 WIB\nSabtu: 07.00 – 12.00 WIB',
              },
            ].map(({ icon, title, content, link, linkText }) => (
              <div key={title} className="flex gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-[#2B3B6F] rounded-xl flex items-center justify-center text-white text-xl shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{title}</h3>
                  <p className="text-slate-600 text-sm whitespace-pre-line">{content}</p>
                  {link && linkText && (
                    <a href={link} target="_blank" rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:underline mt-1 inline-block">
                      {linkText}
                    </a>
                  )}
                </div>
              </div>
            ))}

            {/* Sosmed */}
            <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-slate-900 mb-3">Media Sosial</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Facebook', icon: '📘', url: '#' },
                  { name: 'Instagram', icon: '📸', url: '#' },
                  { name: 'YouTube', icon: '📺', url: '#' },
                ].map(({ name, icon, url }) => (
                  <a key={name} href={url} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:shadow-md transition-shadow">
                    <span>{icon}</span> {name}
                  </a>
                ))}
              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm h-48">
              <iframe
                src="https://maps.google.com/maps?q=Lumajang+Jawa+Timur&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi SMA PGRI 1 Lumajang"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
