import React from 'react';

/**
 * MOCK DATA: 
 * Nanti data ini bisa lo lempar lewat props kalau sudah ada API/Backend.
 */
const globalActivities = [
  { 
    id: 1, 
    user: "Danar Putera", 
    action: "Configured SD-WAN Node 02", 
    dept: "IT NETWORK", 
    time: "2 mins ago", 
    status: "success" 
  },
  { 
    id: 2, 
    user: "Moy", 
    action: "Updated Payroll Structure", 
    dept: "FINANCE", 
    time: "15 mins ago", 
    status: "info" 
  },
  { 
    id: 3, 
    user: "HR Staff", 
    action: "Onboarded 3 New Interns", 
    dept: "HR / SDM", 
    time: "1 hour ago", 
    status: "info" 
  },
  { 
    id: 4, 
    user: "System Security", 
    action: "Blocked Unauthorized Port 8080", 
    dept: "SECURITY", 
    time: "3 hours ago", 
    status: "warning" 
  },
];

export default function ActivityLog() {
  // Helper warna berdasarkan divisi atau status
  const getDeptColor = (dept) => {
    switch (dept) {
      case 'IT NETWORK': return 'text-blue-400 border-blue-500/20';
      case 'FINANCE': return 'text-emerald-400 border-emerald-500/20';
      case 'HR / SDM': return 'text-pink-400 border-pink-500/20';
      case 'SECURITY': return 'text-rose-400 border-rose-500/20';
      default: return 'text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="bg-[#0f172a]/80 border border-white/5 rounded-3xl p-6 backdrop-blur-2xl shadow-2xl h-full flex flex-col">
      {/* Header Log */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col">
          <h3 className="text-xs font-black uppercase italic text-white tracking-[0.2em]">
            Global Activity Log
          </h3>
          <p className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-widest">
            Cross-Division Monitoring
          </p>
        </div>
        <div className="flex gap-1.5 items-center bg-indigo-500/10 px-2 py-1 rounded-md">
          <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></span>
          <span className="text-[9px] font-black text-indigo-400 font-mono">LIVE</span>
        </div>
      </div>

      {/* List Aktivitas */}
      <div className="flex-1 space-y-7 overflow-y-auto custom-scrollbar pr-2">
        {globalActivities.map((log) => (
          <div key={log.id} className="relative pl-6 border-l border-slate-800/50 group hover:border-indigo-500/50 transition-all duration-300">
            
            {/* Dot Indicator */}
            <div className="absolute -left-[4.5px] top-0.5 w-2 h-2 rounded-full bg-slate-800 group-hover:bg-indigo-500 transition-all duration-300 ring-4 ring-[#0f172a]"></div>
            
            <div className="flex flex-col gap-1">
              {/* Dept & Time */}
              <div className="flex justify-between items-center">
                <span className={`text-[9px] font-black uppercase tracking-widest border-b px-0.5 pb-0.5 ${getDeptColor(log.dept)}`}>
                  {log.dept}
                </span>
                <span className="text-[9px] font-mono text-slate-600 font-bold italic">
                  {log.time}
                </span>
              </div>

              {/* Action Description */}
              <p className="text-[11px] text-slate-300 leading-relaxed mt-1 group-hover:text-white transition-colors">
                <span className="text-slate-100 font-bold">{log.user}</span> {log.action}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer / Button Action */}
      <button className="mt-8 w-full py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-500 group">
        <span className="group-hover:tracking-[0.5em] transition-all">Download Audit Trail</span>
      </button>
    </div>
  );
}