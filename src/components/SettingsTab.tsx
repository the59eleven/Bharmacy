import { useState } from "react";
import { Save } from "lucide-react";

export default function SettingsTab() {
  const [marginThreshold, setMarginThreshold] = useState(50);
  const [lowStockAlert, setLowStockAlert] = useState(10);
  const [evKey, setEvKey] = useState("ev_api_***7f3a");
  const [scKey, setScKey] = useState("sc_api_***9b2e");
  const [deKey, setDeKey] = useState("de_api_***4c1d");

  return (
    <div>
      <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em] mb-6">
        Settings
      </h2>

      <div className="max-w-2xl space-y-6">
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Supplier API Keys
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-1.5">
                EuroVial Labs (EV)
              </label>
              <input
                type="password"
                value={evKey}
                onChange={(e) => setEvKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-raised border border-[#222224] text-sm text-[#e8e8e6] font-mono outline-none focus:border-[#d4a048] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-1.5">
                SciCore Biotech (SC)
              </label>
              <input
                type="password"
                value={scKey}
                onChange={(e) => setScKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-raised border border-[#222224] text-sm text-[#e8e8e6] font-mono outline-none focus:border-[#d4a048] transition-colors"
              />
            </div>
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-1.5">
                DeutscheSynth GmbH (DE)
              </label>
              <input
                type="password"
                value={deKey}
                onChange={(e) => setDeKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg bg-surface-raised border border-[#222224] text-sm text-[#e8e8e6] font-mono outline-none focus:border-[#d4a048] transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Margin Thresholds
          </h3>
          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                  Minimum Acceptable Margin
                </label>
                <span className="font-mono text-sm text-[#d4a048]">
                  {marginThreshold}%
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={100}
                value={marginThreshold}
                onChange={(e) => setMarginThreshold(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #d4a048 ${marginThreshold}%, #222224 ${marginThreshold}%)`,
                  accentColor: "#d4a048",
                }}
              />
              <div className="flex justify-between mt-1">
                <span className="font-mono text-[9px] text-[#4a4a48]">10%</span>
                <span className="font-mono text-[9px] text-[#4a4a48]">100%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Alert Thresholds
          </h3>
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                Low Stock Alert Level
              </label>
              <span className="font-mono text-sm text-[#d4a048]">
                {lowStockAlert} units
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={50}
              value={lowStockAlert}
              onChange={(e) => setLowStockAlert(Number(e.target.value))}
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #d4a048 ${(lowStockAlert / 50) * 100}%, #222224 ${(lowStockAlert / 50) * 100}%)`,
                accentColor: "#d4a048",
              }}
            />
            <div className="flex justify-between mt-1">
              <span className="font-mono text-[9px] text-[#4a4a48]">1</span>
              <span className="font-mono text-[9px] text-[#4a4a48]">50</span>
            </div>
          </div>
        </div>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#d4a048] text-[#040405] rounded-lg text-sm font-mono uppercase tracking-wider hover:bg-[#c09040] transition-colors">
          <Save size={14} />
          Save Changes
        </button>
      </div>
    </div>
  );
}
