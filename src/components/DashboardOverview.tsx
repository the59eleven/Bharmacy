import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  ShoppingCart,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  CircleDollarSign,
  Layers,
  Truck,
} from "lucide-react";

export default function DashboardOverview() {
  const summaryQuery = trpc.analytics.summary.useQuery();
  const productsQuery = trpc.product.list.useQuery({});
  const recentOrdersQuery = trpc.order.recent.useQuery();

  const summary = summaryQuery.data;
  const isLoading = summaryQuery.isLoading;
  const products = productsQuery.data ?? [];
  const recentOrders = recentOrdersQuery.data ?? [];

  if (isLoading || !summary) {
    return <DashboardSkeleton />;
  }

  const { inventory, orders, avgMargin } = summary;

  const criticalStock = products
    .filter((p: { stock: number }) => p.stock <= 10 && p.stock > 0)
    .slice(0, 6);

  const outOfStockItems = products
    .filter((p: { status: string }) => p.status === "Out of Stock")
    .slice(0, 6);

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
              <Package size={18} className="text-[#4ade80]" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                In Stock
              </div>
              <div className="font-mono text-2xl text-[#e8e8e6] font-semibold tabular-nums">
                {inventory.inStock}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-[#d4a048]">{inventory.lowStock} low</span>
            <span className="text-[#4a4a48]">|</span>
            <span className="text-[#f87171]">{inventory.outOfStock} out</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4a048]/10 flex items-center justify-center">
              <ShoppingCart size={18} className="text-[#d4a048]" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                Pending Orders
              </div>
              <div className="font-mono text-2xl text-[#e8e8e6] font-semibold tabular-nums">
                {orders.pending}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-[#4ade80]">{orders.processing} processing</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#4ade80]/10 flex items-center justify-center">
              <CircleDollarSign size={18} className="text-[#4ade80]" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                Revenue (Delivered)
              </div>
              <div className="font-mono text-2xl text-[#d4a048] font-semibold tabular-nums">
                ${(orders.revenue / 1000).toFixed(1)}k
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-[#4ade80]">+12.4% vs last year</span>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-[#d4a048]/10 flex items-center justify-center">
              <TrendingUp size={18} className="text-[#d4a048]" />
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[#4a4a48]">
                Avg Markup
              </div>
              <div className="font-mono text-2xl text-[#e8e8e6] font-semibold tabular-nums">
                {avgMargin}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono">
            <span className="text-[#8a8a88]">Target: 25%</span>
          </div>
        </div>
      </div>

      {/* Middle Row */}
      <div className="grid grid-cols-3 gap-4">
        {/* Critical Stock */}
        <div className="col-span-2 p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-[#d4a048]" />
              <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88]">
                Low Stock Alert
              </h3>
              <span className="font-mono text-[10px] text-[#d4a048] bg-[#d4a048]/10 px-2 py-0.5 rounded-full">
                {criticalStock.length} items
              </span>
            </div>
          </div>

          {criticalStock.length === 0 ? (
            <p className="text-sm text-[#4a4a48] py-4">No critical stock items</p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {criticalStock.map((p: { id: number; name: string; supplier: string; stock: number; unit_cost: number }) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-[#141417] border border-[#222224] hover:border-[#d4a048]/30 transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-sm text-[#e8e8e6] truncate">{p.name}</div>
                    <div className="font-mono text-[10px] text-[#4a4a48]">{p.supplier} | ${Number(p.unit_cost).toFixed(0)} cost</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="w-16 h-1.5 rounded-full bg-[#222224] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#d4a048]"
                        style={{ width: `${Math.min((p.stock / 10) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="font-mono text-xs text-[#d4a048] tabular-nums w-6 text-right">
                      {p.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Out of Stock */}
        <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
          <div className="flex items-center gap-2 mb-4">
            <Layers size={15} className="text-[#f87171]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88]">
              Out of Stock
            </h3>
            <span className="font-mono text-[10px] text-[#f87171] bg-[#f87171]/10 px-2 py-0.5 rounded-full">
              {outOfStockItems.length}
            </span>
          </div>
          <div className="space-y-2">
            {outOfStockItems.map((p: { id: number; name: string; supplier: string }) => (
              <div
                key={p.id}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#141417] border border-[#222224]"
              >
                <div>
                  <div className="text-sm text-[#e8e8e6]">{p.name}</div>
                  <div className="font-mono text-[10px] text-[#4a4a48]">{p.supplier}</div>
                </div>
                <span className="font-mono text-[10px] text-[#f87171] uppercase">No Cost</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-5 rounded-xl bg-surface-base border border-[#222224]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Truck size={15} className="text-[#8a8a88]" />
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#8a8a88]">
              Recent Orders
            </h3>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {recentOrders.map((o: { id: number; order_id: string; customer: string; status: string; total: number; date: string }) => (
            <div
              key={o.id}
              className="p-4 rounded-lg bg-[#141417] border border-[#222224] hover:border-[#d4a048]/20 transition-colors"
            >
              <div className="font-mono text-xs text-[#d4a048] mb-1">{o.order_id}</div>
              <div className="text-sm text-[#e8e8e6] truncate mb-2">{o.customer}</div>
              <div className="flex items-center justify-between">
                <span
                  className={`font-mono text-[10px] uppercase tracking-wider ${
                    o.status === "Delivered"
                      ? "text-[#4ade80]"
                      : o.status === "Shipped"
                      ? "text-[#8a8a88]"
                      : "text-[#d4a048]"
                  }`}
                >
                  {o.status}
                </span>
                <span className="font-mono text-sm text-[#e8e8e6] tabular-nums">
                  ${Number(o.total).toFixed(0)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-28 bg-[#141417] rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-64 bg-[#141417] rounded-xl col-span-2" />
        <Skeleton className="h-64 bg-[#141417] rounded-xl" />
      </div>
      <Skeleton className="h-40 bg-[#141417] rounded-xl" />
    </div>
  );
}
