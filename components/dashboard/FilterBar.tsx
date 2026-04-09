import { Search, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleRefresh: () => void;
  isRefreshing: boolean;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  handleRefresh,
  isRefreshing,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-3 text-slate-400" size={18} />
        <Input
          placeholder="Search logs by ID or User..."
          className="h-10 px-4 min-w-[160px] pl-10 bg-white border-slate-200 focus:ring-indigo-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Action Group */}
      <div className="flex gap-2">
        {/* Status Dropdown */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 px-3 py-2 bg-white border border-slate-200 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer appearance-none pr-8"
          >
            <option value="All">Semua Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Error">Error</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Refresh Button */}
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="h-10 px-4 min-w-[160px] bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100 flex items-center gap-2"
        >
          <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
          {isRefreshing ? "Refreshing..." : "Refresh Logs"}
        </Button>
      </div>
    </div>
  );
}
