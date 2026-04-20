import React from 'react';

export default function FinanceDashboard() {
  return (
    /* h-full flex-col tetap, tapi bg diubah jadi dinamis (slate-50 untuk light, #020617 untuk dark) */
    <div className="h-full flex flex-col items-center justify-center bg-slate-50 dark:bg-[#020617] p-8 transition-colors duration-500">
      
      {/* Spinner - Amber 500 tetap oke di kedua mode */}
      <div className="w-20 h-20 border-4 border-amber-500/10 dark:border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-6"></div>
      
      {/* Text Utama - Pakai slate-900 di Light Mode */}
      <h2 className="text-3xl font-black italic text-slate-900 dark:text-white uppercase tracking-tighter">
        Finance <span className="text-amber-500">Under Maintenance</span>
      </h2>
      
      {/* Subtext - Pakai slate-500 yang aman di kedua mode */}
      <p className="text-slate-500 dark:text-slate-400 font-mono text-[10px] mt-2 uppercase tracking-[0.4em] text-center">
        Status: Encrypting Ledger Databases...
      </p>

      {/* Tambahan: Progress bar kecil biar makin estetik */}
      <div className="w-48 h-1 bg-slate-200 dark:bg-white/5 rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-amber-500 animate-[progress_2s_ease-in-out_infinite] w-1/3"></div>
      </div>
    </div>
  );
}