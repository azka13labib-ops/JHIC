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

const getInitialMessages = (year: string): Message[] => [
  {
    id: 'welcome-1',
    sender: 'bot',
    text: `Halo! 👋 Saya **SMAGRISA AI Assistant**, asisten cerdas resmi SMA PGRI 1 Lumajang.\n\nAda yang bisa saya bantu terkait **PPDB ${year}, Peminatan Jurusan, 13 Ekstrakurikuler, atau Fasilitas Sekolah**?`,
    time: 'Baru saja',
    quickActions: [
      { label: '📝 Syarat & 2 Jalur PPDB', query: `Jelaskan syarat dan 2 jalur pendaftaran PPDB ${year} di SMAGRISA` },
      { label: '🏆 Jadwal 13 Ekstrakurikuler', query: 'Sebutkan 13 ekstrakurikuler pilihan dan ekstrakurikuler wajib beserta jadwalnya' },
      { label: '📚 Pilihan Jurusan', query: 'Apa saja jurusan peminatan di SMA PGRI 1 Lumajang?' },
      { label: '🏢 Fasilitas Sekolah', query: 'Ceritakan tentang fasilitas laboratorium dan kampus modern di SMAGRISA' },
      { label: '🎓 Profil Kepala Sekolah & Guru', query: 'Siapa Kepala Sekolah dan bagaimana kualitas tenaga pendidik di SMAGRISA?' },
    ],
  },
];

function sanitizeText(raw: string): string {
  if (!raw) return '';
  let cleaned = raw.replace(/<think>[\s\S]*?<\/think>/gi, '');
  cleaned = cleaned.replace(/<think>[\s\S]*/gi, '');
  cleaned = cleaned.replace(/<\/?think>/gi, '');
  return cleaned.trim();
}

export function FloatingChatbot() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [academicYear, setAcademicYear] = useState('2026/2027');
  const [messages, setMessages] = useState<Message[]>(getInitialMessages('2026/2027'));
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messageIdCounter = useRef(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch dynamic academic year from backend API
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
    fetch(`${apiUrl}/ppdb/info`)
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          return res.json();
        } else {
          throw new Error("Response was not JSON");
        }
      })
      .then(json => {
        const data = json?.data;
        if (data?.academic_year) {
          setAcademicYear(data.academic_year);
          setMessages(prev => {
            // Only update welcome message if user hasn't chatted yet
            if (prev.length === 1 && prev[0].id === 'welcome-1') {
              return getInitialMessages(data.academic_year);
            }
            return prev;
          });
        }
      })
      .catch(err => console.error("Failed to fetch PPDB info:", err));
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isTyping) return;

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
      const apiMessages = newHistory.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: sanitizeText(m.text),
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: apiMessages,
          academicYear: academicYear 
        }),
      });

      let botReply = '';
      if (res.ok) {
        const data = await res.json();
        botReply = sanitizeText(data.reply) || 'Mohon maaf, saya belum memahami pertanyaan tersebut.';
      } else {
        botReply = 'Maaf, terjadi kendala saat menghubungi server AI. Silakan tanyakan kembali beberapa saat lagi.';
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
    setMessages(getInitialMessages(academicYear));
  };

  const renderFormattedText = (text: string) => {
    const safeText = sanitizeText(text);
    return safeText.split('\n').map((line, lineIdx) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={lineIdx} className="block min-h-[1.1rem]">
          {parts.map((part, partIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-bold text-slate-900">
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      
      {/* Interactive Chat Window Modal */}
      {isOpen && (
        <div className="mb-3 w-[92vw] sm:w-96 h-130 max-h-[80vh] bg-white rounded-2xl shadow-xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="bg-blue-900 px-4 py-3 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                <Bot className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="font-bold text-xs">SMAGRISA Virtual Assistant</div>
                <div className="text-[10px] text-blue-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Layanan Informasi Otomatis</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                title="Mulai Ulang Percakapan"
                className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Tutup Chat"
                className="p-1.5 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Message List Body */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-slate-50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-6 h-6 rounded-md bg-blue-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="max-w-[85%] space-y-1.5">
                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
                    }`}
                  >
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Quick Action Buttons */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-0.5">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(qa.query)}
                          className="text-[10px] font-semibold px-2.5 py-1 rounded-md bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition-colors flex items-center gap-1 cursor-pointer text-left shadow-2xs"
                        >
                          <span>{qa.label}</span>
                          <ChevronRight className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                        </button>
                      ))}
                    </div>
                  )}

                  <div
                    className={`text-[9px] text-slate-400 ${
                      msg.sender === 'user' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-6 h-6 rounded-md bg-slate-800 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <div className="w-6 h-6 rounded-md bg-blue-700 text-white flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-[11px] shadow-2xs">
                  AI sedang menyusun jawaban...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-2.5 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-1.5"
            >
              <input
                type="text"
                placeholder="Ketik pertanyaan seputar sekolah..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                disabled={isTyping}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className="px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 text-white font-bold text-xs transition-colors shrink-0 cursor-pointer"
                aria-label="Kirim Pesan"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Tutup Asisten AI' : 'Buka Asisten AI Sekolah'}
        className="w-12 h-12 rounded-xl bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
      >
        {isOpen ? (
          <X className="w-5 h-5 text-white" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </button>

    </div>
  );
}
