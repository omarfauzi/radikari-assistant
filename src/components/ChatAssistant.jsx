import React, { useState, useEffect, useRef } from 'react';

export default function ChatAssistant({ user, activeMenu }) {
  const firstName = user?.name ? user.name.split(' ')[0] : 'User';
  const userRole = user?.role || 'GUEST';
  
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([
    { text: `Halo ${firstName}! Ada yang bisa dibantu hari ini?`, isBot: true }
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMessages([...messages, { text: `📁 Menyiapkan file: ${file.name}`, isBot: false }]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput("");

    try {
      const response = await fetch('http://127.0.0.1:8000/api/chat', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMessage,
          divisi: activeMenu ? activeMenu.toLowerCase() : "hr", 
          user_id: userRole,
          history: messages.slice(-6).map(m => ({
            role: m.isBot ? "assistant" : "user",
            content: m.text
          }))
        })
      });

      if (!response.ok) throw new Error('Backend Error');
      const data = await response.json();
      const botReply = data.reply || "Maaf, tidak ada respons dari sistem.";
      setMessages(prev => [...prev, { text: botReply, isBot: true }]);

    } catch (error) {
      setMessages(prev => [...prev, { 
        text: "❌ Koneksi ke Backend terputus. Pastikan server FastAPI (port 8000) sudah berjalan!", 
        isBot: true 
      }]);
    }
  };

  return (
    /* Ubah angka 80px di bawah ini kalau masih kurang mentok atau malah kerendahan.
       Rounded kita buang supaya bener-bener nempel ke dasar.
    */
    <div className="flex flex-col h-[calc(100vh-80px)] bg-slate-50 dark:bg-[#020617] overflow-hidden transition-colors duration-500">
      
      {/* AREA PESAN */}
      <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 custom-scrollbar">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.isBot ? 'justify-start' : 'justify-end'} animate-in fade-in duration-300`}>
            <div className={`max-w-[85%] md:max-w-[75%] p-5 text-sm leading-relaxed shadow-sm ${
              m.isBot 
                ? 'bg-white dark:bg-slate-800/40 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/5 rounded-2xl rounded-tl-none backdrop-blur-md whitespace-pre-wrap shadow-slate-200/50' 
                : 'bg-red-600 text-white font-bold rounded-2xl rounded-tr-none shadow-lg shadow-red-600/20'
            }`}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {/* AREA INPUT - Nempel Mentok ke Bawah */}
      <div className="flex-none p-6 md:p-8 border-t border-slate-200 dark:border-white/5 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-2xl">
        <form onSubmit={handleSend} className="max-w-6xl mx-auto flex items-center gap-4">
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

          <button 
            type="button"
            onClick={handleUploadClick}
            className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-red-600 transition-all shrink-0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>

          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ada kendala apa, Bro?"
            className="flex-1 bg-slate-100 dark:bg-[#020617] border border-slate-200 dark:border-white/10 rounded-xl py-4 md:py-5 px-6 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-red-600 shadow-inner"
          />

          <button type="submit" className="bg-red-600 hover:bg-red-700 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-white shadow-lg shadow-red-600/30 shrink-0">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </form>
        <p className="text-center text-[9px] text-slate-400 dark:text-slate-500 mt-4 font-black uppercase tracking-[0.4em]">
          RADIKARI INTELLIGENCE NODE ACTIVE
        </p>
      </div>
    </div>
  );
}