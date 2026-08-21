import { NextResponse } from 'next/server';
import { SYSTEM_PROMPT } from '@/config/ai-prompts';

// Helper to strip any <think> reasoning tags
function cleanAIResponse(rawText: string): string {
  if (!rawText) return '';
  return rawText.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
}

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

    // Priority models list on Groq
    const candidateModels = [
      'qwen/qwen3.6-27b',
      'llama-3.3-70b-versatile',
      'llama-3.1-8b-instant',
      'openai/gpt-oss-120b',
      'openai/gpt-oss-20b'
    ];

    let reply = '';

    for (const model of candidateModels) {
      try {
        const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            messages: formattedMessages,
            temperature: 0.3,
            max_tokens: 2048,
            top_p: 0.85,
          }),
        });

        if (groqResponse.ok) {
          const data = await groqResponse.json();
          const rawReply = data.choices?.[0]?.message?.content || '';
          reply = cleanAIResponse(rawReply);
          if (reply) break;
        }
      } catch (err) {
        console.error(`Error trying model ${model}:`, err);
      }
    }

    if (!reply) {
      reply = 'Halo! Saya adalah Asisten Virtual SMAGRISA. Ada yang bisa saya bantu seputar PPDB 2026, 13 Ekstrakurikuler, Jurusan, atau Fasilitas SMA PGRI 1 Lumajang?';
    }

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
