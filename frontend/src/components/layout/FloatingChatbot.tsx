'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bot, 
  Send, 
  X, 
  RotateCcw, 
  ChevronRight,
  User
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
    text: 'Halo! 👋 Selamat datang di Layanan Informasi SMA PGRI 1 Lumajang.\n\nAda yang bisa kami bantu terkait informasi **PPDB, Jurusan, Ekstrakurikuler, atau Fasilitas Sekolah**?',
    time: 'Baru saja',
    quickActions: [
      { label: '📝 Syarat & Jalur PPDB', query: 'Jelaskan syarat dan jalur pendaftaran PPDB di SMAGRISA' },
      { label: '🏆 Jadwal Ekstrakurikuler', query: 'Sebutkan pilihan ekstrakurikuler beserta jadwalnya' },
      { label: '📚 Pilihan Jurusan', query: 'Apa saja jurusan peminatan di SMA PGRI 1 Lumajang?' },
      { label: '🏢 Fasilitas Sekolah', query: 'Ceritakan tentang fasilitas laboratorium dan sekolah di SMAGRISA' },
      { label: '🎓 Profil Kepala Sekolah & Guru', query: 'Siapa Kepala Sekolah dan bagaimana kualitas tenaga pendidik di SMAGRISA?' },
    ],
  },
];

export function FloatingChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showNotificationBadge, setShowNotificationBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const messageIdCounter = useRef(1);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

    // Handle Quick Navigation Action Commands if clicked
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

    messageIdCounter.current += 1;
    const userMsg: Message = {
      id: `user-${messageIdCounter.current}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Send conversation history to Groq AI API route
      const apiMessages = newHistory.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      });

      let botReply = '';
      if (res.ok) {
        const data = await res.json();
        botReply = data.reply || 'Mohon maaf, saya belum memahami pertanyaan tersebut.';
      } else {
        botReply = 'Maaf, terjadi gangguan pada server AI. Silakan tanyakan kembali beberapa saat lagi.';
      }

      messageIdCounter.current += 1;
      const botMsg: Message = {
        id: `bot-${messageIdCounter.current}`,
        sender: 'bot',
        text: botReply,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        quickActions: [
          { label: '📝 Buka PPDB', query: 'buka-ppdb' },
          { label: '🏆 Cek 13 Ekskul', query: 'buka-ekskul' },
          { label: '🏢 Lihat Fasilitas', query: 'buka-fasilitas' },
        ],
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch {
      messageIdCounter.current += 1;
      const errorMsg: Message = {
        id: `bot-${messageIdCounter.current}`,
        sender: 'bot',
        text: 'Koneksi AI terputus sementara. Anda tetap dapat menjelajahi menu PPDB, Jurusan, dan Ekstrakurikuler di website kami.',
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  // Simple Markdown text renderer for bold (*text*), lists (- item), and linebreaks
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((line, lineIdx) => {
      // Process bold formatting
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lineIdx} className="block min-h-[1.1rem]">
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-extrabold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
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
                  <span>Pusat Bantuan</span>
                </div>
                <div className="text-[11px] text-blue-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Layanan Informasi SMAGRISA</span>
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
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Quick Action Buttons */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(qa.query)}
                          className="text-[11px] font-bold px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition shadow-2xs flex items-center gap-1 cursor-pointer text-left"
                        >
                          <span>{qa.label}</span>
                          <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
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

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
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
                  <span className="text-[11px] text-slate-500 font-medium ml-1">Sedang mengetik...</span>
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
                placeholder="Tanyakan apa saja seputar sekolah..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="w-10 h-10 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 text-white flex items-center justify-center shrink-0 shadow-md transition cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
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
            <span>Butuh Bantuan? Tanya Kami 💬</span>
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
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 text-[9px] font-black text-white items-center justify-center" />
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
