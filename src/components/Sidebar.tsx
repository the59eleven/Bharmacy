import { LayoutDashboard, Package, ShoppingCart, Truck, BarChart3, Settings, User } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "suppliers", label: "Suppliers", icon: Truck },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const activeIndex = navItems.findIndex((item) => item.id === activeTab);

  return (
    <aside
      className="fixed left-0 top-0 h-full flex flex-col justify-between py-6"
      style={{
        width: 240,
        background: "#0b0b0d",
        borderRight: "1px solid #222224",
        zIndex: 50,
      }}
    >
      <div>
        <div className="px-6 mb-8">
          <span className="font-geist font-medium text-xl text-[#e8e8e6]">
            Bharmacy
          </span>
        </div>

        <nav className="relative px-3">
          {activeIndex >= 0 && (
            <div
              className="absolute left-3 w-1 rounded-full bg-[#d4a048] transition-transform duration-300"
              style={{
                height: 20,
                top: 12 + activeIndex * 44,
              }}
            />
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeTab;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-mono uppercase tracking-[0.08em] transition-all duration-200 ${
                  isActive
                    ? "text-[#e8e8e6]"
                    : "text-[#8a8a88] hover:text-[#e8e8e6] hover:bg-[#141417]"
                }`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#141417] border border-[#222224] flex items-center justify-center">
          <User size={14} className="text-[#8a8a88]" />
        </div>
        <span className="font-mono text-xs text-[#8a8a88] uppercase tracking-wider">
          Admin
        </span>
      </div>
    </aside>
  );
}
