'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="pt-8 pb-20 lg:pt-12 lg:pb-28 bg-white text-slate-900 overflow-hidden relative">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Title & Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-blue-900">
              TENTANG KAMI • DEDIKASI PENDIDIKAN BERKARAKTER
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-slate-900 leading-tight">
              SMA PGRI 1 Lumajang
            </h2>

            <div className="space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                Sebagai salah satu institusi pendidikan terkemuka di Kabupaten Lumajang, SMA PGRI 1 berkomitmen mewujudkan ekosistem belajar yang memadukan keunggulan akademik, ketakwaan religius, serta kecakapan digital masa depan.
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                Melalui kurikulum merdeka komprehensif, tenaga pendidik berdedikasi tinggi, dan pembinaan karakter yang berintegritas, kami membimbing setiap siswa menemukan potensi terbaik mereka untuk melanjutkan studi ke perguruan tinggi terkemuka maupun berkarya secara profesional.
              </p>
            </div>

            {/* Micro Stats / Highlights */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <GraduationCap className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <div className="text-base font-black text-slate-900">Akreditasi A</div>
                <div className="text-[10px] text-slate-500 font-semibold">BAN-SM Unggul</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <Award className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <div className="text-base font-black text-slate-900">Fase E & F</div>
                <div className="text-[10px] text-slate-500 font-semibold">Kurikulum Merdeka</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-center">
                <Users className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <div className="text-base font-black text-slate-900">Riset & PTN</div>
                <div className="text-[10px] text-slate-500 font-semibold">Bimbingan Intensif</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/profil/sejarah"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <span>Baca Selengkapnya Profil & Sejarah Sekolah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Tall Portrait Photo */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Siswa Berprestasi SMA PGRI 1 Lumajang"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/40 via-transparent to-transparent" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
