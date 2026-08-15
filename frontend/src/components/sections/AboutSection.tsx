import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#000000] text-white overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            {/* Contextual Subtitle without dummy Lorem Ipsum */}
            <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-neutral-400">
              TENTANG KAMI • DEDIKASI PENDIDIKAN BERKARAKTER
            </div>

            {/* Main Headline in classical Serif */}
            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-white leading-tight">
              SMA PGRI 1 Lumajang
            </h2>

            {/* Paragraphs in clean light gray */}
            <div className="space-y-4 text-neutral-300 text-xs sm:text-sm leading-relaxed">
              <p>
                Sebagai salah satu institusi pendidikan terkemuka di Kabupaten Lumajang, SMA PGRI 1 berkomitmen mewujudkan ekosistem belajar yang memadukan keunggulan akademik, ketakwaan religius, serta kecakapan vokasi berbasis teknologi masa depan.
              </p>
              <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                Melalui kurikulum komprehensif, tenaga pendidik berdedikasi tinggi, dan pembinaan karakter yang berintegritas, kami membimbing setiap siswa menemukan potensi terbaik mereka untuk melanjutkan studi ke perguruan tinggi terkemuka maupun berkarya di dunia industri global.
              </p>
            </div>
          </div>

          {/* Right Column: Tall Portrait Graduate Photo */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-3/4 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-neutral-900">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Graduate SMA PGRI 1 Lumajang"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
