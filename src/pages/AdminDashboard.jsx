import React from 'react';
import StatsCards from '../components/ApprovalDashboard/StatsCards';
import ActivityLog from '../components/ActivityLog';

export default function AdminDashboard({ allLogs, user }) {
  // Data statistik gabungan untuk Admin
  const adminStats = [
    { title: "Total Users", value: "24", icon: "Users", color: "text-blue-400", bg: "bg-blue-500/10" },
    { title: "Global Approvals", value: allLogs.length.toString(), icon: "CheckCircle", color: "text-emerald-400", bg: "bg-emerald-500/10" },
    { title: "System Alerts", value: "0", icon: "Shield", color: "text-rose-400", bg: "bg-rose-500/10" },
  ];

  return (
    <div className="flex flex-col gap-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
          Super Admin Command Center
        </h1>
        <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mt-1">
          Monitoring all divisions in real-time
        </p>
      </header>

      <StatsCards stats={adminStats} />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Kolom Kiri: Monitoring Utama (75%) */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 backdrop-blur-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest">Division Performance Overview</h3>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full animate-pulse font-mono">
                LIVE MONITORING
              </span>
            </div>
            
            {/* Placeholder untuk Visualisasi Data/Grafik Monitoring */}
            <div className="h-[400px] flex items-center justify-center border border-dashed border-white/10 rounded-2xl">
               <p className="text-slate-500 text-sm italic">
                  [ Map Monitoring atau Chart Performa Divisi di sini ]
               </p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Centralized Activity Log (25%) */}
        <div className="xl:col-span-1">
          <ActivityLog />
        </div>
      </div>
    </div>
  );
}