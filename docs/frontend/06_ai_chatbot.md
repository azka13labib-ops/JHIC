# Task Frontend: Fitur 5 - AI ChatBot

## Deskripsi
UI untuk widget percakapan AI yang melayang di pojok layar (bisa diakses dari semua halaman).

## Todo List
- [ ] Install library `ai` (Vercel AI SDK) untuk mengelola *streaming state* chat.
- [ ] Buat komponen `ChatWidget.tsx` (Tombol melayang di pojok kanan bawah).
- [ ] Buat UI Jendela Percakapan (Header, Area Pesan, Input Text).
- [ ] Desain gelembung pesan (*chat bubble*) dengan warna berbeda untuk *User* dan *Bot*.
- [ ] Implementasikan integrasi `useChat` hook untuk memanggil API Endpoint.
- [ ] Implementasikan *Auto-scroll* ke bagian bawah daftar pesan ketika ada balasan baru.
- [ ] Simpan *Chat History* di `sessionStorage` agar percakapan tidak ter-reset ketika pengguna pindah halaman.
- [ ] Sediakan fitur "Fallback" (pesan baku jika bot tidak bisa menjawab) yang mengarahkan user untuk menghubungi WhatsApp resmi sekolah.
