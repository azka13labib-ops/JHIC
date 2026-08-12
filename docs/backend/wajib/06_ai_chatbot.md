  # Task Backend / API: Fitur 5 - AI ChatBot

## Deskripsi
Integrasi dengan LLM (Google Gemini API) untuk menjawab pertanyaan seputar sekolah secara otomatis menggunakan RAG (Retrieval-Augmented Generation) dasar.

> [!IMPORTANT]
> **Keputusan Arsitektur**: Fitur ini **TIDAK** dikerjakan di Laravel, melainkan akan diimplementasikan sepenuhnya di *Route Handlers* **Next.js** menggunakan **Vercel AI SDK**. Hal ini dilakukan untuk menjamin kelancaran *streaming data* (efek mengetik secara *real-time*) tanpa terhambat *buffer* dari konfigurasi server PHP/Nginx.

## Todo List (Fase Frontend)
- [ ] Daftar dan dapatkan API Key dari Google AI Studio (Gemini).
- [ ] Simpan API Key dengan aman di file `.env`.
- [ ] Siapkan dokumen *Knowledge Base* (bisa berupa teks panjang/markdown berisi FAQ, alur PPDB, visi misi sekolah) yang akan dijadikan *System Prompt* atau Konteks AI.
- [ ] Buat Endpoint Chat (`POST /api/chat`):
  - Menerima payload history percakapan.
  - Memanggil Google Gemini API.
  - Merespon dengan *Streaming Data* (Server-Sent Events) agar chatbot di frontend bisa mengetik per kata.
- [ ] Keamanan: Terapkan *Rate Limiting* yang ketat (misal 20 chat per jam per IP) agar API quota tidak disalahgunakan / dibobol.
