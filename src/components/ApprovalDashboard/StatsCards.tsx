import { Activity, Clock, ShieldCheck, Users, CheckCircle, Shield } from "lucide-react";

interface Stat {
  title: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
}

export function StatsCards({ stats = [] }: { stats?: Stat[] }) {
  if (!stats || stats.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 bg-white dark:bg-white/5 animate-pulse rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => {
        // Logic pemilihan icon yang lebih lengkap
        const iconMap: Record<string, any> = {
          Activity,
          Clock,
          ShieldCheck,
          Users,
          CheckCircle,
          Shield
        };
        const Icon = iconMap[stat.icon] || Activity;

        return (
          <div
            key={index}
            /* FIX: Background Putih Solid & Shadow Tebal di Light Mode */
            className="bg-white dark:bg-slate-900/50 p-6 rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl dark:shadow-none flex items-center gap-5 hover:scale-[1.02] transition-all backdrop-blur-md"
          >
            {/* Icon Wrapper */}
            <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} shadow-sm`}>
              <Icon size={26} />
            </div>

            <div>
              {/* FIX: Teks judul pakai slate-500 agar kontras di terang */}
              <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest leading-none mb-1">
                {stat.title}
              </p>
              {/* FIX: Ganti text-white menjadi dinamis sesuai prop color */}
              <h3 className={`text-3xl font-black tracking-tighter ${stat.color.includes('dark:') ? stat.color : 'text-slate-900 dark:text-white'}`}>
                {stat.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StatsCards;