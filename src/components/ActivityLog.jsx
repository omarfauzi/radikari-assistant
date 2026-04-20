import React from 'react';

const globalActivities = [
  { id: 1, user: "Danar Putera", action: "Configured SD-WAN Node 02", dept: "IT NETWORK", time: "2 mins ago" },
  { id: 2, user: "Moy", action: "Updated Payroll Structure", dept: "FINANCE", time: "15 mins ago" },
  { id: 3, user: "HR Staff", action: "Onboarded 3 New Interns", dept: "HR / SDM", time: "1 hour ago" },
  { id: 4, user: "System Security", action: "Blocked Unauthorized Port 8080", dept: "SECURITY", time: "3 hours ago" },
];

export default function ActivityLog() {
  const getDeptColor = (dept) => {
    switch (dept) {
      case 'IT NETWORK': return 'text-blue-500 dark:text-blue-400 border-blue-500/20';
      case 'FINANCE': return 'text-emerald-500 dark:text-emerald-400 border-emerald-500/20';
      case 'HR / SDM': return 'text-pink-500 dark:text-pink-400 border-pink-500/20';
      case 'SECURITY': return 'text-rose-500 dark:text-rose-400 border-rose-500/20';
      default: return 'text-slate-500 dark:text-slate-400 border-slate-500/20';
    }
  };

  return (
    /* 1. CONTAINER: bg-white di light mode, bg-slate di dark mode */
    <div className="bg-white/80 dark:bg-[#0f172a]/80 border border-slate-200 dark:border-white/5 rounded-3xl p-6 backdrop-blur-2xl shadow-xl dark:shadow-2xl h-full flex flex-col transition-colors duration-500">
      
      {/* Header Log */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h3 className="text-xs font-black uppercase italic text-slate-900 dark:text-white tracking-[0.2em]">
            Global Activity Log
          </h3>
          <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
            Cross-Division Monitoring
          </p>
        </div>
        <div className="flex gap-1.5 items-center bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          <span className="text-[9px] font-black text-indigo-600 dark:text-indigo-400 font-mono">LIVE</span>
        </div>
      </div>

      {/* List Aktivitas */}
      <div className="flex-1 space-y-7 overflow-y-auto custom-scrollbar pr-2">
        {globalActivities.map((log) => (
          <div key={log.id} className="relative pl-6 border-l border-slate-200 dark:border-slate-800/50 group hover:border-indigo-500/50 transition-all duration-300">
            
            {/* Dot Indicator: Sesuai background masing-masing mode */}
            <div className="absolute -left-[4.5px] top-0.5 w-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800 group-hover:bg-indigo-500 transition-all duration-300 ring-4 ring-white dark:ring-[#0f172a]"></div>
            
            <div className="flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black uppercase tracking-widest border-b px-0.5 pb-0.5 ${getDeptColor(log.dept)}`}>
                  {log.dept}
                </span>
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 font-bold italic">
                  {log.time}
                </span>
              </div>

              {/* Action Description: text-slate-700 di Light Mode biar kontras */}
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed mt-1 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                <span className="text-slate-900 dark:text-slate-100 font-bold">{log.user}</span> {log.action}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Button: Berubah jadi solid/indigo saat di-hover */}
      <button className="mt-8 w-full py-3 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-xl text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.3em] hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white hover:border-indigo-500 transition-all duration-500 group">
        <span className="group-hover:tracking-[0.5em] transition-all">Download Audit Trail</span>
      </button>
    </div>
  );
}