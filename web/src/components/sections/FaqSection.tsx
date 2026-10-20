'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const FAQS: FaqItem[] = [
  {
    question: 'Apakah SMA PGRI 1 Lumajang sudah menerapkan Kurikulum Merdeka?',
    answer: 'Ya, SMA PGRI 1 Lumajang menerapkan Kurikulum Merdeka secara penuh. Pembelajaran dirancang berbasis minat dan bakat siswa dengan fondasi Fase E (Kelas X) serta peminatan Fase F (Kelas XI & XII) yang meliputi jurusan MIPA, IPS, dan Ilmu Bahasa & Budaya.',
  },
  {
    question: 'Bagaimana alur pendaftaran siswa baru (PPDB) 2026?',
    answer: 'Pendaftaran dapat dilakukan secara mandiri melalui portal resmi kami di menu PPDB Online (https://smapgri1lumajang.sch.id/ppdb/daftar) atau langsung hadir ke sekretariat panitia PPDB di kampus SMA PGRI 1 Lumajang, Jl. K.H. Wachid Hasyim No.20-B, Lumajang.',
  },
  {
    question: 'Apa saja jurusan peminatan yang tersedia di SMA PGRI 1 Lumajang?',
    answer: 'Tersedia 3 peminatan Fase F: 1) MIPA (Matematika & Ilmu Pengetahuan Alam) yang mempersiapkan siswa ke Fakultas Kedokteran dan Teknik PTN, 2) IPS (Ilmu Pengetahuan Sosial) untuk bidang ekonomi, hukum, dan manajemen, serta 3) Ilmu Bahasa & Budaya untuk penguasaan bahasa asing dan literatur global.',
  },
  {
    question: 'Berapa akreditasi resmi SMA PGRI 1 Lumajang?',
    answer: 'SMA PGRI 1 Lumajang menyandang predikat Akreditasi A (Unggul) dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-SM) dengan fasilitas pembelajaran berstandar mutu tinggi.',
  },
  {
    question: 'Apa saja fasilitas pendukung kegiatan belajar siswa?',
    answer: 'Sekolah menyediakan 3 laboratorium komputer terpadu berbasis gigabit, laboratorium sains (Fisika, Kimia, Biologi), studio multimedia podcast, perpustakaan digital ber-AC, lapangan olahraga multifungsi, dan jaringan internet fiber optik terintegrasi.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-16 lg:py-20 bg-white text-slate-900 border-t border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-900 mb-2">
            <HelpCircle className="w-4 h-4 text-blue-700" />
            <span>Pusat Tanya Jawab (FAQ)</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-slate-900 tracking-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
            Informasi ringkas dan jawaban resmi seputar kurikulum, pendaftaran PPDB, dan keunggulan akademik SMA PGRI 1 Lumajang.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-700 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 bg-white">
                    <p className="pt-3.5">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
