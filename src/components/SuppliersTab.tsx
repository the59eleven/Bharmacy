import { trpc } from "@/providers/trpc";
import { Truck, Package, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface SuppliersTabProps {
  searchQuery: string;
}

export default function SuppliersTab({ searchQuery }: SuppliersTabProps) {
  const { data: suppliers, isLoading } = trpc.supplier.list.useQuery(
    searchQuery ? { search: searchQuery } : undefined
  );

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30";
    if (grade.startsWith("B")) return "bg-[#d4a048]/10 text-[#d4a048] border-[#d4a048]/30";
    return "bg-[#f87171]/10 text-[#f87171] border-[#f87171]/30";
  };

  const getStatusColor = (status: string) => {
    if (status === "Active") return "text-[#4ade80]";
    if (status === "Review") return "text-[#d4a048]";
    return "text-[#f87171]";
  };

  if (isLoading) {
    return <SuppliersSkeleton />;
  }

  return (
    <div>
      <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em] mb-6">
        Suppliers
      </h2>

      <div className="grid grid-cols-3 gap-4">
        {(suppliers ?? []).map((s: Record<string, unknown>) => (
          <div
            key={s.id as number}
            className="p-6 rounded-lg bg-surface-base border border-[#222224] hover:border-[#d4a048]/30 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#141417] border border-[#222224] flex items-center justify-center">
                  <Truck size={16} className="text-[#d4a048]" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-[#e8e8e6]">
                    {s.name as string}
                  </h3>
                  <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
                    {s.code as string}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-xs font-mono border ${getGradeColor(s.grade as string)}`}>
                {s.grade as string}
              </span>
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-[#8a8a88]">Reliability</span>
                <span className="font-mono text-xs text-[#e8e8e6]">
                  {s.reliability as number}/5
                </span>
              </div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${
                      i <= (s.reliability as number)
                        ? i <= 3
                          ? "bg-[#4ade80]"
                          : i === 4
                          ? "bg-[#d4a048]"
                          : "bg-[#22c55e]"
                        : "bg-[#222224]"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#222224]">
              <div className="flex items-center gap-2">
                <Package size={13} className="text-[#8a8a88]" />
                <div>
                  <div className="font-mono text-sm text-[#e8e8e6] tabular-nums">
                    {s.product_count as number}
                  </div>
                  <div className="text-[10px] text-[#4a4a48]">Products</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={13} className="text-[#8a8a88]" />
                <div>
                  <div className="font-mono text-sm text-[#4ade80] tabular-nums">
                    {s.avg_margin as number}%
                  </div>
                  <div className="text-[10px] text-[#4a4a48]">Avg Margin</div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#222224] flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
                Volume: ${(s.total_volume as number).toLocaleString()}
              </span>
              <span className={`font-mono text-[10px] uppercase tracking-wider ${getStatusColor(s.status as string)}`}>
                {s.status as string}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SuppliersSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-32 mb-6 bg-[#141417]" />
      <div className="grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-64 bg-[#141417] rounded-lg" />
        ))}
      </div>
    </div>
  );
}
