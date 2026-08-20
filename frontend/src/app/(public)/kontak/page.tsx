import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import type { Metadata } from 'next';
import ContactForm from './ContactForm';

export const metadata: Metadata = {
  title: 'Hubungi Kami | SMA PGRI 1 Lumajang',
  description: 'Hubungi SMA PGRI 1 Lumajang melalui formulir kontak, telepon, atau kunjungi kami langsung di Lumajang, Jawa Timur.',
};

export default function KontakPage() {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Alamat Sekolah',
      content: 'Jl. Gatot Subroto No. 11, Tompokersan, Kec. Lumajang, Kab. Lumajang, Prov. Jawa Timur, Indonesia',
      link: 'https://maps.google.com/?q=SMAS+PGRI+1+Lumajang',
      linkText: 'Buka di Google Maps →',
    },
    {
      icon: Phone,
      title: 'Layanan Telepon & WhatsApp',
      content: '(0334) 881234 / 0812-3456-7890',
      link: 'tel:+62334881234',
      linkText: 'Hubungi via Telepon',
    },
    {
      icon: Mail,
      title: 'Surat Elektronik (Email)',
      content: 'info@smapgri1lmj.sch.id',
      link: 'mailto:info@smapgri1lmj.sch.id',
      linkText: 'Kirim Email Resmi',
    },
    {
      icon: Clock,
      title: 'Jam Pelayanan Tata Usaha',
      content: 'Senin – Jumat: 07.00 – 15.00 WIB\nSabtu: 07.00 – 12.00 WIB',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-14">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="max-w-2xl">
            <span className="text-xs font-bold tracking-widest text-blue-900 uppercase block mb-1">
              Pusat Komunikasi & Informasi
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
              Hubungi SMA PGRI 1 Lumajang
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Tim sekretariat dan panitia PPDB siap melayani pertanyaan seputar pendaftaran, kerjasama, dan administrasi sekolah.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 sm:py-12 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Formulir Kontak (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-2xs">
            <div className="mb-6">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-700" />
                <span>Kirim Pesan Resmi</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Sampaikan pertanyaan atau permohonan informasi Anda melalui formulir di bawah ini.
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Info Kontak & Sosmed (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Informasi Kontak Langsung
              </h2>

              <div className="space-y-3">
                {contactInfo.map(({ icon: IconComponent, title, content, link, linkText }) => (
                  <div key={title} className="flex gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100 items-start">
                    <div className="w-8 h-8 bg-blue-50 border border-blue-100 rounded-md flex items-center justify-center text-blue-700 shrink-0 mt-0.5">
                      <IconComponent className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-xs text-slate-900">{title}</h3>
                      <p className="text-slate-600 text-xs whitespace-pre-line mt-0.5">{content}</p>
                      {link && linkText && (
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 text-[11px] font-semibold hover:text-blue-700 mt-1 inline-block"
                        >
                          {linkText}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Sosial */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                Saluran Media Sosial Resmi
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Facebook SMAGRISA', url: 'https://www.facebook.com/profile.php?id=100086591771887' },
                  { name: 'Instagram', url: 'https://www.instagram.com/smagrisalumajang/' },
                  { name: 'YouTube Official', url: 'https://www.youtube.com/@smapgri1lumajangchannel867' },
                ].map(({ name, url }) => (
                  <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-700 rounded-lg transition-colors"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Peta Lokasi */}
      <section className="container mx-auto px-4 pb-12 max-w-6xl">
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 shadow-2xs">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-700" />
            Peta Lokasi Sekolah
          </h2>
          <div className="w-full h-80 sm:h-96 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
            <iframe 
              src="https://maps.google.com/maps?q=SMA%20PGRI%201%20Lumajang&t=&z=16&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi SMA PGRI 1 Lumajang"
            ></iframe>
          </div>
        </div>
      </section>

    </div>
  );
}
