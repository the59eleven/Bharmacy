import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";

const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function AnalyticsTab() {
  const { data: summary, isLoading } = trpc.analytics.summary.useQuery();

  if (isLoading || !summary) {
    return <AnalyticsSkeleton />;
  }

  const { inventory, avgMargin, supplierMargins, monthlyRevenue } = summary;

  const months = monthOrder.filter((m) => monthlyRevenue[m] !== undefined);
  const maxRevenue = Math.max(...Object.values(monthlyRevenue), 1);
  const totalRevenue = Object.values(monthlyRevenue).reduce((s, v) => s + v, 0);

  return (
    <div>
      <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em] mb-6">
        Analytics
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-2">
            Annual Revenue
          </div>
          <div className="font-mono text-2xl text-[#d4a048] font-semibold tabular-nums">
            ${(totalRevenue / 1000).toFixed(1)}k
          </div>
          <div className="font-mono text-[10px] text-[#4ade80] mt-1">
            +12.4% vs last year
          </div>
        </div>
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-2">
            Avg Margin
          </div>
          <div className="font-mono text-2xl text-[#4ade80] font-semibold tabular-nums">
            {avgMargin}%
          </div>
          <div className="font-mono text-[10px] text-[#4a4a48] mt-1">
            Across all suppliers
          </div>
        </div>
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48] mb-2">
            Active Products
          </div>
          <div className="font-mono text-2xl text-[#e8e8e6] font-semibold tabular-nums">
            {inventory.total}
          </div>
          <div className="font-mono text-[10px] text-[#4a4a48] mt-1">
            From {supplierMargins.length} suppliers
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Monthly Revenue
          </h3>
          <div className="flex items-end gap-2 h-40">
            {months.map((m) => (
              <div key={m} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm bg-[#d4a048]/60 hover:bg-[#d4a048] transition-colors"
                  style={{ height: `${(monthlyRevenue[m] / maxRevenue) * 100}%` }}
                />
                <span className="font-mono text-[9px] text-[#4a4a48]">{m}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Margin by Supplier
          </h3>
          <div className="space-y-4">
            {supplierMargins.map((s: { name: string; margin: number }) => {
              const barWidth = Math.min((s.margin / 80) * 100, 100);
              return (
                <div key={s.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#e8e8e6]">{s.name}</span>
                    <span className="font-mono text-xs text-[#d4a048]">{s.margin}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-[#141417] overflow-hidden">
                    <div className="h-full rounded-full bg-[#4ade80]" style={{ width: `${barWidth}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function AnalyticsSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-32 mb-6 bg-[#141417]" />
      <div className="grid grid-cols-3 gap-4 mb-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-28 bg-[#141417] rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-64 bg-[#141417] rounded-lg" />
        <Skeleton className="h-64 bg-[#141417] rounded-lg" />
      </div>
    </div>
  );
}
