import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import DashboardOverview from "../components/DashboardOverview";
import ProductsTab from "../components/ProductsTab";
import OrdersTab from "../components/OrdersTab";
import SuppliersTab from "../components/SuppliersTab";
import AnalyticsTab from "../components/AnalyticsTab";
import SettingsTab from "../components/SettingsTab";

interface DashboardProps {
  initialTab?: string;
}

export default function Dashboard({ initialTab = "dashboard" }: DashboardProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const contentRef = useRef<HTMLDivElement>(null);

  const handleTabChange = useCallback(
    (tab: string) => {
      if (tab === activeTab) return;

      const content = contentRef.current;
      if (content) {
        gsap.to(content, {
          opacity: 0,
          y: -10,
          duration: 0.15,
          ease: "power2.in",
          onComplete: () => {
            setActiveTab(tab);
            setSearchQuery("");
            if (content) {
              gsap.fromTo(
                content,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3, delay: 0.05, ease: "power2.out" }
              );
            }
          },
        });
      } else {
        setActiveTab(tab);
        setSearchQuery("");
      }
    },
    [activeTab]
  );

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "products":
        return <ProductsTab searchQuery={searchQuery} />;
      case "orders":
        return <OrdersTab searchQuery={searchQuery} />;
      case "suppliers":
        return <SuppliersTab searchQuery={searchQuery} />;
      case "analytics":
        return <AnalyticsTab />;
      case "settings":
        return <SettingsTab />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <section
      id="dashboard"
      className="min-h-screen"
      style={{ background: "#040405" }}
    >
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <TopBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main
        className="relative pt-[56px] px-6 pb-10"
        style={{ marginLeft: 240 }}
      >
        <div ref={contentRef} className="max-w-[1200px] mx-auto py-6">
          {renderTab()}
        </div>
      </main>
    </section>
  );
}
