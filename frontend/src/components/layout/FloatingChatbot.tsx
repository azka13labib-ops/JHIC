'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  quickActions?: { label: string; query: string }[];
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: 'Halo! 👋 Saya SMAGRISA AI Assistant, asisten virtual resmi SMA PGRI 1 Lumajang. Ada yang bisa saya bantu?',
    time: 'Baru saja',
    quickActions: [
      { label: '📝 Syarat & Jadwal PPDB', query: 'ppdb' },
      { label: '🏆 Pilihan 13 Ekstrakurikuler', query: 'ekskul' },
      { label: '🏢 Fasilitas Sekolah', query: 'fasilitas' },
      { label: '📚 Peminatan Jurusan', query: 'jurusan' },
      { label: '📍 Lokasi & Kontak Sekolah', query: 'kontak' },
    ],
  },
];

const BOT_KNOWLEDGE_BASE: { keywords: string[]; answer: string; quickActions?: { label: string; query: string }[] }[] = [
  {
    keywords: ['ppdb', 'daftar', 'pendaftaran', 'syarat', 'biaya', 'jalur'],
    answer: 'Pendaftaran PPDB 2026 SMA PGRI 1 Lumajang membuka 2 Jalur Resmi: Jalur Reguler & Jalur Prestasi. Syarat berkas meliputi SKL/Ijazah, KK, Akta Kelahiran, Pas Foto 3x4 merah, dan NISN. Anda dapat langsung mendaftar secara online di menu PPDB.',
    quickActions: [
      { label: '🔗 Buka Halaman PPDB', query: 'buka-ppdb' },
      { label: '🔍 Cek Status Berkas', query: 'status-ppdb' },
    ],
  },
  {
    keywords: ['ekskul', 'ekstrakurikuler', 'basket', 'futsal', 'paskibra', 'silat', 'karawitan', 'tari', 'pmr', 'band', 'esport', 'albanjari'],
    answer: 'SMAGRISA memiliki 1 Ekstrakurikuler Wajib (Pramuka) dan 13 Ekstrakurikuler Pilihan: PASGRISA, Futsal, Basket, Math Study Club, Albanjari, Game Sport (E-Sport), Tari, Volly, PMR, Karawitan, Band, English Study Club, dan Pencak Silat.',
    quickActions: [
      { label: '🏆 Lihat Jadwal Semua Ekskul', query: 'buka-ekskul' },
    ],
  },
  {
    keywords: ['jurusan', 'peminatan', 'mipa', 'ips', 'bahasa', 'kurikulum'],
    answer: 'SMA PGRI 1 Lumajang menerapkan Kurikulum Merdeka dengan 3 peminatan unggulan di Fase F: 1) MIPA (Matematika & Sains), 2) IPS (Sosial & Humaniora), dan 3) Ilmu Bahasa & Budaya dengan sertifikasi digital industri.',
    quickActions: [
      { label: '🔬 Info Jurusan MIPA', query: 'mipa' },
      { label: '📊 Info Jurusan IPS', query: 'ips' },
    ],
  },
  {
    keywords: ['fasilitas', 'lab', 'komputer', 'lapangan', 'masjid', 'aula', 'studio'],
    answer: 'Fasilitas kampus modern kami meliputi 3 Lab Komputer Core i7 (Internet 500 Mbps), Lab Sains Riset Terpadu, Perpustakaan Digital, Studio Podcast & Broadcasting, Lapangan Olahraga Multifungsi, Smart Classroom, Masjid Sekolah, dan Kantin Sehat Eco-Park.',
    quickActions: [
      { label: '🏢 Eksplorasi Fasilitas Lengkap', query: 'buka-fasilitas' },
    ],
  },
  {
    keywords: ['kontak', 'alamat', 'lokasi', 'telepon', 'wa', 'whatsapp', 'nomor'],
    answer: 'SMA PGRI 1 Lumajang beralamat di Lumajang, Jawa Timur. Anda dapat menghubungi layanan informasi via WhatsApp di +62 812-3456-7890 atau email ke info@smapgri1lumajang.sch.id pada jam kerja.',
  },
  {
    keywords: ['guru', 'kepala sekolah', 'pengajar', 'staf'],
    answer: 'SMAGRISA didukung oleh 15+ tenaga pendidik profesional berpendidikan S1 dan S2 dari universitas terkemuka (UM, UNAIR, ITS, UB) serta praktisi bersertifikasi industri.',
  },
  {
    keywords: ['prestasi', 'juara', 'lomba', 'olimpiade'],
    answer: 'Siswa-siswi SMAGRISA rutin meraih medali kejuaraan di tingkat Kabupaten, Provinsi, hingga Nasional pada ajang OSN, O2SN, FLS2N, LKS, serta turnamen DBL Basket.',
  },
];

let messageCounter = 1;

export function FloatingChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    // Handle Quick Navigation Action Commands
    if (query === 'buka-ppdb') {
      router.push('/ppdb');
      setIsOpen(false);
      return;
    }
    if (query === 'status-ppdb') {
      router.push('/ppdb/status');
      setIsOpen(false);
      return;
    }
    if (query === 'buka-ekskul') {
      router.push('/ekstrakurikuler');
      setIsOpen(false);
      return;
    }
    if (query === 'buka-fasilitas') {
      router.push('/profil/fasilitas');
      setIsOpen(false);
      return;
    }

    messageCounter += 1;
    const userMsg: Message = {
      id: `user-${messageCounter}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // Bot Auto Response matching rule engine
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const matched = BOT_KNOWLEDGE_BASE.find((k) =>
        k.keywords.some((kw) => lowerQuery.includes(kw))
      );

      let replyText = matched?.answer;
      let quickActions = matched?.quickActions;

      if (!replyText) {
        replyText =
          'Terima kasih atas pertanyaannya. Untuk informasi lebih spesifik mengenai "' +
          query +
          '", Anda juga dapat membaca menu informasi kami atau menghubungi panitia via halaman Kontak.';
        quickActions = [
          { label: '📝 Syarat PPDB', query: 'ppdb' },
          { label: '🏆 Ekstrakurikuler', query: 'ekskul' },
          { label: '🏢 Fasilitas Kampus', query: 'fasilitas' },
        ];
      }

      messageCounter += 1;
      const botMsg: Message = {
        id: `bot-${messageCounter}`,
        sender: 'bot',
        text: replyText,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        quickActions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* 1. Interactive Chat Window Modal */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-100 h-135 max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 via-indigo-600 to-indigo-700 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shadow-inner relative">
                <Bot className="w-6 h-6 text-white" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-indigo-700 absolute -top-0.5 -right-0.5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm">
                  <span>SMAGRISA AI</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20 text-white font-extrabold tracking-wider">
                    BOT
                  </span>
                </div>
                <div className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Online • Asisten Virtual Sekolah</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Mulai Ulang Percakapan"
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/15 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message List Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/70">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className="max-w-[82%] space-y-2">
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Quick Action Buttons */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(qa.query)}
                          className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition shadow-2xs flex items-center gap-1 cursor-pointer"
                        >
                          <span>{qa.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[10px] text-slate-400 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-7 h-7 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white border border-slate-200 p-3 rounded-2xl flex items-center gap-1.5 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ketik pertanyaan (misal: syarat ppdb)..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md transition cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="text-[10px] text-center text-slate-400 mt-1.5 font-medium flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>Didukung SMAGRISA Smart AI Assistant</span>
            </div>
          </div>

        </div>
      )}

      {/* 2. Floating Chatbot Trigger Button */}
      <div className="flex items-center gap-3">
        
        {/* Floating Greeting Tooltip */}
        {!isOpen && showNotificationBadge && (
          <div 
            onClick={() => { setIsOpen(true); setShowNotificationBadge(false); }}
            className="hidden sm:flex items-center gap-2.5 bg-white text-slate-800 text-xs font-semibold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-200/90 cursor-pointer hover:border-blue-300 transition-all hover:scale-102 duration-200"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <span>Tanya Asisten AI Sekolah 🤖</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotificationBadge(false);
              }}
              className="text-slate-400 hover:text-slate-600 ml-1 p-0.5"
              aria-label="Tutup pesan bantuan"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Chatbot Floating Circle Button */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setShowNotificationBadge(false);
          }}
          aria-label={isOpen ? 'Tutup Asisten AI' : 'Buka Asisten AI Sekolah'}
          className="w-14 h-14 rounded-full bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-800 hover:from-blue-700 hover:to-indigo-900 text-white flex items-center justify-center shadow-xl shadow-blue-600/35 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer relative"
        >
          {/* Online Pulsing Glow */}
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-black text-white items-center justify-center">
              AI
            </span>
          </span>

          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Bot className="w-7 h-7 text-white animate-pulse" />
          )}
        </button>
      </div>

    </div>
  );
}
