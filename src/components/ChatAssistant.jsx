import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant({ user, activeMenu }) {
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  const userRole = user?.role || 'GUEST';
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null); // Ref untuk input file tersembunyi

  const [messages, setMessages] = useState([
    { text: `Halo ${firstName}! Ada yang bisa dibantu untuk kendala IT hari ini?`, isBot: true }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fungsi buat trigger klik pada input file yang sembunyi
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  // Fungsi saat file dipilih
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { text: `📁 Menyiapkan file: ${file.name}`, isBot: false }]);
      // Di sini lo bisa lanjutin logic upload ke server kalau mau
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Tampilkan pesan user di UI
    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");

    try {
      const response = await fetch('/api/v1/chat/completions', { 
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_OPENCLAW_TOKEN}`
      },
      body: JSON.stringify({ 
        model: "openclaw", 
        messages: [
          { 
            role: "user", 
            content: `[Context: User ${firstName}, Role ${userRole}, Divisi ${activeMenu}] ${userMessage}` 
          }
        ],
        stream: false 
      }),
    });

      if (!response.ok) throw new Error('Gateway Error');

      const data = await response.json();

      // 2. Ambil jawaban dari struktur data OpenAI
      const botReply = data.choices?.[0]?.message?.content || "DeepSeek tidak memberikan respons.";
      
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);

    } catch (error) {
      // Penanganan jika Docker/Gateway mati
      setMessages(prev => [...prev, { 
        text: "❌ Koneksi ke Node terputus. Pastikan Docker OpenClaw di port 18789 sudah jalan!", 
        isBot: true 
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#020617] overflow-hidden">
      
      {/* AREA PESAN */}
      <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-300`}>
            <div className={`max-w-[75%] p-5 text-sm leading-relaxed ${
              m.isBot 
                ? 'bg-slate-800/40 text-slate-200 border border-white/5 rounded-2xl rounded-tl-none backdrop-blur-md' 
                : 'bg-red-600 text-white font-bold rounded-2xl rounded-tr-none shadow-lg shadow-red-900/20'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* AREA INPUT */}
      <div className="shrink-0 p-8 border-t border-white/5 bg-[#0f172a]/80 backdrop-blur-xl">
        <form onSubmit={handleSend} className="max-w-6xl mx-auto flex items-center gap-4">
          
          {/* INPUT FILE TERSEMBUNYI */}
          <input 
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
          />

          {/* TOMBOL UPLOAD (+) */}
          <button 
            type="button"
            onClick={handleUploadClick} // Sekarang ada fungsinya!
            className="flex items-center justify-center w-14 h-14 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ada kendala apa, Bro?"
            className="flex-1 bg-[#020617] border border-white/10 rounded-xl py-5 px-6 text-sm focus:outline-none focus:border-red-600 text-white shadow-inner"
          />

          <button type="submit" className="bg-red-600 hover:bg-red-700 w-14 h-14 rounded-xl flex items-center justify-center text-white transition-transform active:scale-95 shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-500 mt-4 font-bold uppercase tracking-[0.4em]">
          RADIKARI INTELLIGENCE NODE ACTIVE
        </p>
      </div>
    </div>
  );
}