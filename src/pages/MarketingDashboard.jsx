import React from 'react';

export default function MarketingDashboard() {
  return (
    /* Background dinamis biar support Light & Dark Mode */
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] p-8 transition-colors duration-500">
      
      {/* Spinner - Menggunakan Indigo-500 sebagai identitas Marketing */}
      <div className="w-20 h-20 border-4 border-indigo-500/10 dark:border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
      
      {/* Text Utama */}
      <h2 className="text-3xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter">
        Marketing <span className="text-indigo-500">Under Calibration</span>
      </h2>
      
      {/* Subtext - Menyesuaikan konteks Marketing */}
      <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mt-2 uppercase tracking-[0.4em] text-center">
        Status: Syncing Campaign Pixels & Audience Data...
      </p>

      {/* Progress Bar Estetik */}
      <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-indigo-500 animate-[progress_2s_ease-in-out_infinite] w-2/3"></div>
      </div>
    </div>
  );
}