import { Search, Bell } from "lucide-react";

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function TopBar({ searchQuery, onSearchChange }: TopBarProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <header
      className="fixed top-0 right-0 flex items-center justify-between px-6"
      style={{
        height: 56,
        left: 240,
        background: "rgba(11,11,13,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #222224",
        zIndex: 40,
      }}
    >
      <div className="flex items-center flex-1 max-w-xl">
        <Search size={15} className="text-[#4a4a48] mr-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search products, orders, suppliers..."
          className="w-full bg-transparent text-sm text-[#e8e8e6] placeholder-[#4a4a48] outline-none font-mono"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-[#8a8a88] uppercase tracking-wider">
          {today}
        </span>
        <button className="relative p-2 rounded-lg hover:bg-[#141417] transition-colors">
          <Bell size={15} className="text-[#8a8a88]" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#f87171]" />
        </button>
      </div>
    </header>
  );
}
