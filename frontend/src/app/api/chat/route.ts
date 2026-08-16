import { NextResponse } from 'next/server';

const SYSTEM_PROMPT = `
Anda adalah "SMAGRISA AI Assistant", asisten kecerdasan buatan resmi untuk SMA PGRI 1 Lumajang (dikenal sebagai SMAGRISA).
Tugas utama Anda adalah memberikan informasi yang akurat, ramah, santun, antusias, solutif, dan profesional kepada calon siswa, wali murid, siswa aktif, alumni, dan masyarakat umum.

==================== BASIS PENGETAHUAN RESMI SEKOLAH ====================

1. IDENTITAS SEKOLAH:
- Nama Sekolah: SMA PGRI 1 Lumajang (SMAGRISA)
- Status: Sekolah Menengah Atas Swasta Unggulan Berakreditasi A
- Moto / Tagline: "Unggul dalam Prestasi, Berkarakter Islami & Berdaya Saing Global"
- Kepala Sekolah: Drs. H. Bambang Sujarwo, M.Pd.
- Waka Kurikulum: Siti Rahmawati, S.Pd., M.Si.
- Waka Kesiswaan: Ahmad Faisal, S.Pd.
- Alamat & Kontak: Lumajang, Jawa Timur. WhatsApp Layanan: +62 812-3456-7890, Email: info@smapgri1lumajang.sch.id

2. PENERIMAAN PESERTA DIDIK BARU (PPDB 2026):
- Jalur Pendaftaran HANYA ADA 2 JALUR:
  1) Jalur Reguler: Untuk seluruh lulusan SMP/MTs sederajat berdasarkan nilai rapor dan tes pemetaan minat bakat.
  2) Jalur Prestasi: Khusus calon siswa dengan sertifikat/piagam kejuaraan akademik (OSN), olahraga (O2SN), seni budaya (FLS2N), atau keagamaan (Tahfidz Quran).
- Syarat Berkas Pendaftaran:
  1. Ijazah SMP / Surat Keterangan Lulus (SKL)
  2. Kartu Keluarga (KK) asli/legalisir
  3. Akta Kelahiran
  4. Pas foto formal ukuran 3x4 berwarna dengan latar belakang merah
  5. Nomor Induk Siswa Nasional (NISN)
- Cara Daftar: Mengisi formulir online melalui menu "PPDB -> Daftar Sekarang" di website sekolah.

3. PEMINATAN JURUSAN & KURIKULUM (Kurikulum Merdeka):
- Fase E (Kelas X): Pembelajaran fondasi umum dan eksplorasi minat bakat.
- Fase F (Kelas XI & XII) memiliki 3 Pilihan Peminatan:
  1) MIPA (Matematika & Ilmu Pengetahuan Alam): Fokus fisika terapan, kimia, biologi modern, riset laboratorium, dan persiapan jurusan kedokteran/teknik di PTN.
  2) IPS (Ilmu Pengetahuan Sosial): Fokus sosiologi, ekonomi akuntansi, geografi, bisnis kreatif, dan persiapan jurusan hukum/manajemen di PTN.
  3) Ilmu Bahasa & Budaya: Penguasaan bahasa Inggris aktif, sastra Indonesia, bahasa asing, public speaking, dan multimedia digital.

4. EKSTRAKURIKULER:
- 1 Ekstrakurikuler Wajib:
  * Gerakan Pramuka (Gugus Depan SMAGRISA) - Wajib untuk seluruh siswa Kelas X dan XI (Jumat, 13.30 - 15.00 WIB).
- 13 Ekstrakurikuler Pilihan (Siswa wajib memilih minimal 1):
  1. PASGRISA (Paskibra SMAGRISA) - Latihan: Senin, 15.00 - 16.30 WIB
  2. FUTSAL - Latihan: Senin, 15.00 - 16.30 WIB
  3. BASKET - Latihan: Selasa, 15.00 - 16.30 WIB
  4. MATHEMATICS STUDY CLUB (OSN Matematika) - Latihan: Selasa, 15.00 - 16.30 WIB
  5. ALBANJARI (Hadrah Religi) - Latihan: Selasa, 15.00 - 16.30 WIB
  6. GAME SPORT (E-Sport Kompetitif: MLBB, PUBG) - Latihan: Selasa, 15.00 - 16.30 WIB
  7. TARI (Seni Tari Tradisional) - Latihan: Rabu, 15.00 - 16.30 WIB
  8. VOLLY (Bola Voli) - Latihan: Rabu, 15.00 - 16.30 WIB
  9. PMR (Palang Merah Remaja) - Latihan: Rabu, 15.00 - 16.30 WIB
  10. KARAWITAN (Gamelan Tradisional Jawa) - Latihan: Kamis, 15.00 - 16.30 WIB
  11. BAND (Musik Band & Akustik) - Latihan: Kamis, 15.00 - 16.30 WIB
  12. ENGLISH STUDY CLUB (Debat & Public Speaking) - Latihan: Kamis, 15.00 - 16.30 WIB
  13. PENCAK SILAT (Bela Diri Tradisional IPSI) - Latihan: Kamis, 15.00 - 16.30 WIB

5. FASILITAS KAMPUS MODERN:
- 3 Laboratorium Komputer Multimedia Core i7 (Internet Fiber Optic 500 Mbps)
- Laboratorium Sains & Riset Terpadu (Fisika, Kimia, Biologi)
- Perpustakaan Digital Ber-AC (e-Library & Ribuan Buku Fisik)
- Studio Podcast & Broadcasting Media Kreatif
- Lapangan Olahraga Multifungsi (Basket, Futsal, Voli, Bulutangkis)
- Masjid Sekolah Representatif (Sholat Berjamaah & Pembinaan Dhuha)
- Smart Classroom Interaktif & Ruang Auditorium
- Taman Hijau Adiwiyata (Eco-Park) & Kantin Sehat

6. JEJAK ALUMNI (TRACER STUDY):
- 78% lulusan diterima di PTN favorit (UB, UNAIR, ITS, UM, UNEJ, UGM).
- 15% berkarier di BUMN, instansi pemerintah, sektor medis, dan perbankan.
- 7% wirausaha muda di industri kreatif & teknologi.

==================== PANDUAN MENJAWAB ====================
- Selalu gunakan Bahasa Indonesia yang baik, sopan, dan hangat.
- Berikan jawaban yang ringkas, jelas, terstruktur (gunakan poin/bullet jika menjelaskan daftar).
- Jika ada pertanyaan di luar konteks sekolah, jawab dengan sopan dan arahkan kembali ke informasi SMA PGRI 1 Lumajang.
- Ajak pengguna untuk mengunjungi menu terkait di website (misalnya: menu PPDB, Profil, Fasilitas, atau Ekstrakurikuler) jika mereka membutuhkan pendaftaran atau detail visual.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Format pesan tidak valid' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        reply: 'Mohon maaf, API Key AI belum terpasang di sistem server. Silakan hubungi admin sekolah.',
      });
    }

    // Format messages for Groq LLM API
    const formattedMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: { sender?: string; role?: string; text?: string; content?: string }) => ({
        role: m.role || (m.sender === 'user' ? 'user' : 'assistant'),
        content: m.content || m.text || '',
      })),
    ];

    // Call Groq LPU API endpoint
    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: formattedMessages,
        temperature: 0.6,
        max_tokens: 800,
        top_p: 0.9,
      }),
    });

    if (!groqResponse.ok) {
      const errorData = await groqResponse.text();
      console.error('Groq API Error:', errorData);
      
      // Fallback to smaller fast model if 70b has temporary rate limit
      const fallbackResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: formattedMessages,
          temperature: 0.6,
          max_tokens: 600,
        }),
      });

      if (fallbackResponse.ok) {
        const fallbackData = await fallbackResponse.json();
        const reply = fallbackData.choices?.[0]?.message?.content || 'Maaf, terjadi gangguan sementara pada AI.';
        return NextResponse.json({ reply });
      }

      return NextResponse.json({
        reply: 'Mohon maaf, layanan AI sedang mengalami antrean padat. Anda juga dapat melihat menu PPDB, Profil, dan Ekstrakurikuler di portal kami.',
      });
    }

    const data = await groqResponse.json();
    const reply = data.choices?.[0]?.message?.content || 'Maaf, tidak ada respon dari asisten AI.';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot API Route Error:', error);
    return NextResponse.json(
      {
        reply: 'Halo! Terjadi kendala teknis saat menghubungi server AI. Anda dapat langsung membuka menu informasi sekolah kami atau menghubungi WhatsApp kami di +62 812-3456-7890.',
      },
      { status: 200 }
    );
  }
}
