import { Activity, Clock, ShieldCheck } from "lucide-react";

interface Stat {
  title: string;
  value: string;
  icon: string;
  color: string;
  bg: string;
}

export function StatsCards({ stats }: { stats: Stat[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon =
          stat.icon === "Activity"
            ? Activity
            : stat.icon === "Clock"
              ? Clock
              : ShieldCheck;

        return (
          <div
            key={index}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">
                {stat.value}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
