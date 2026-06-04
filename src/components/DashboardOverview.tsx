import { Package, ShoppingCart, Truck, TrendingUp, AlertTriangle } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardOverview() {
  const { data: summary, isLoading } = trpc.analytics.summary.useQuery();

  if (isLoading || !summary) {
    return <DashboardSkeleton />;
  }

  const { inventory, orders, avgMargin } = summary;

  // Get critical stock (products with stock <= 10 and > 0)
  const { data: products } = trpc.product.list.useQuery({});
  const criticalStock = (products ?? [])
    .filter((p: { stock: number; status: string }) => p.stock <= 10 && p.stock > 0)
    .slice(0, 5);

  const { data: recentOrdersData } = trpc.order.recent.useQuery();
  const recentOrders = recentOrdersData ?? [];

  return (
    <div>
      <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em] mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-3 mb-6">
        <div className="p-4 rounded-lg bg-surface-base border border-[#222224]">
          <div className="flex items-center justify-between mb-3">
            <Package size={15} className="text-[#4ade80]" />
            <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
              Inventory
            </span>
          </div>
          <div className="font-mono text-xl text-[#e8e8e6] font-semibold tabular-nums">
            {inventory.inStock}
            <span className="text-[10px] text-[#4a4a48] font-normal ml-1">in stock</span>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <span className="font-mono text-[10px] text-[#d4a048]">{inventory.lowStock} low</span>
            <span className="font-mono text-[10px] text-[#f87171]">{inventory.outOfStock} out</span>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface-base border border-[#222224]">
          <div className="flex items-center justify-between mb-3">
            <ShoppingCart size={15} className="text-[#d4a048]" />
            <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
              Orders
            </span>
          </div>
          <div className="font-mono text-xl text-[#e8e8e6] font-semibold tabular-nums">
            {orders.pending}
            <span className="text-[10px] text-[#4a4a48] font-normal ml-1">pending</span>
          </div>
          <div className="font-mono text-[10px] text-[#4ade80] mt-2">
            {orders.processing} processing
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface-base border border-[#222224]">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp size={15} className="text-[#4ade80]" />
            <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
              Revenue
            </span>
          </div>
          <div className="font-mono text-xl text-[#d4a048] font-semibold tabular-nums">
            ${(orders.revenue / 1000).toFixed(1)}k
          </div>
          <div className="font-mono text-[10px] text-[#4a4a48] mt-2">
            Delivered orders
          </div>
        </div>

        <div className="p-4 rounded-lg bg-surface-base border border-[#222224]">
          <div className="flex items-center justify-between mb-3">
            <Truck size={15} className="text-[#d4a048]" />
            <span className="font-mono text-[10px] text-[#4a4a48] uppercase tracking-wider">
              Avg Margin
            </span>
          </div>
          <div className="font-mono text-xl text-[#4ade80] font-semibold tabular-nums">
            {avgMargin}%
          </div>
          <div className="font-mono text-[10px] text-[#4a4a48] mt-2">
            Across {inventory.total} products
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={14} className="text-[#d4a048]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88]">
              Critical Stock Alerts
            </h3>
          </div>
          <div className="space-y-2">
            {criticalStock.length === 0 ? (
              <p className="text-sm text-[#4a4a48]">No critical items</p>
            ) : (
              criticalStock.map((p: { id: number; name: string; supplier: string; stock: number }) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 px-3 rounded bg-[#141417] border border-[#222224]"
                >
                  <div>
                    <span className="text-sm text-[#e8e8e6]">{p.name}</span>
                    <span className="font-mono text-[10px] text-[#4a4a48] ml-2">
                      {p.supplier}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs tabular-nums ${
                      p.stock <= 5 ? "text-[#f87171]" : "text-[#d4a048]"
                    }`}
                  >
                    {p.stock} units
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="p-5 rounded-lg bg-surface-base border border-[#222224]">
          <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88] mb-4">
            Recent Orders
          </h3>
          <div className="space-y-2">
            {recentOrders.map((o: { id: number; order_id: string; customer: string; status: string; total: number }) => (
              <div
                key={o.id}
                className="flex items-center justify-between py-2 px-3 rounded bg-[#141417] border border-[#222224]"
              >
                <div>
                  <span className="font-mono text-xs text-[#d4a048]">{o.order_id}</span>
                  <span className="text-[10px] text-[#4a4a48] ml-2">
                    {o.customer}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider ${
                      o.status === "Pending"
                        ? "text-[#d4a048]"
                        : o.status === "Processing"
                        ? "text-[#d4a048]"
                        : o.status === "Shipped"
                        ? "text-[#8a8a88]"
                        : "text-[#4ade80]"
                    }`}
                  >
                    {o.status}
                  </span>
                  <span className="font-mono text-xs text-[#e8e8e6] tabular-nums">
                    ${Number(o.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-48 mb-6 bg-[#141417]" />
      <div className="grid grid-cols-4 gap-3 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
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
