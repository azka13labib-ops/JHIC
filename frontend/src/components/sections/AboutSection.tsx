'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Award, GraduationCap, Users } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-16 lg:py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-5">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-blue-900">
              Tentang SMA PGRI 1 Lumajang
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-slate-900 leading-tight">
              Dedikasi untuk Mutu Pendidikan & Karakter Siswa
            </h2>

            <div className="space-y-3.5 text-slate-600 text-xs sm:text-sm leading-relaxed">
              <p>
                Sebagai salah satu institusi pendidikan terpercaya di Kabupaten Lumajang, SMA PGRI 1 berkomitmen mewujudkan ekosistem belajar yang memadukan keunggulan akademik, ketakwaan religius, serta kecakapan literasi digital masa depan.
              </p>
              <p className="text-slate-500">
                Melalui penerapan Kurikulum Merdeka yang fleksibel dan berpusat pada minat siswa, kami mendampingi setiap peserta didik dalam merancang masa depan dan melanjutkan studi ke perguruan tinggi negeri terkemuka.
              </p>
            </div>

            {/* Academic Quality Badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <GraduationCap className="w-5 h-5 text-blue-700 mx-auto mb-1.5" />
                <div className="text-sm font-bold text-slate-900">Akreditasi A</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">BAN-SM Unggul</div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <Award className="w-5 h-5 text-blue-700 mx-auto mb-1.5" />
                <div className="text-sm font-bold text-slate-900">Fase E & F</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Kurikulum Merdeka</div>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <Users className="w-5 h-5 text-blue-700 mx-auto mb-1.5" />
                <div className="text-sm font-bold text-slate-900">78% Tembus PTN</div>
                <div className="text-[11px] text-slate-500 font-medium mt-0.5">Tracer Study</div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/profil/sejarah"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group"
              >
                <span>Baca Selengkapnya Profil & Sejarah Sekolah</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Campus Portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-4/3 sm:aspect-3/4 rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200&auto=format&fit=crop"
                alt="Aktivitas Belajar Siswa SMA PGRI 1 Lumajang"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
