import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";

interface OrdersTabProps {
  searchQuery: string;
}

const columns: { label: string; status: string }[] = [
  { label: "Pending", status: "Pending" },
  { label: "Processing", status: "Processing" },
  { label: "Shipped", status: "Shipped" },
  { label: "Delivered", status: "Delivered" },
];

export default function OrdersTab({ searchQuery }: OrdersTabProps) {
  const { data: orders, isLoading } = trpc.order.list.useQuery(
    searchQuery ? { search: searchQuery } : undefined
  );

  const getColumnBorder = (status: string) => {
    if (status === "Pending") return "border-t-[#d4a048]";
    if (status === "Processing") return "border-t-[#d4a048]/60";
    if (status === "Shipped") return "border-t-[#8a8a88]/40";
    return "border-t-[#4ade80]/40";
  };

  const getStatusDot = (status: string) => {
    if (status === "Pending") return "bg-[#d4a048] animate-pulse";
    if (status === "Processing") return "bg-[#d4a048]";
    if (status === "Shipped") return "bg-[#8a8a88]";
    return "bg-[#4ade80]/50";
  };

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  const allOrders = orders ?? [];

  return (
    <div>
      <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em] mb-6">
        Orders
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {columns.map((col) => {
          const colOrders = allOrders.filter((o: { status: string }) => o.status === col.status);
          return (
            <div key={col.status}>
              <div className={`flex items-center gap-2 mb-3 pb-2 border-t-2 ${getColumnBorder(col.status)}`}>
                <span className={`w-2 h-2 rounded-full ${getStatusDot(col.status)}`} />
                <span className="font-mono text-xs uppercase tracking-wider text-[#8a8a88]">
                  {col.label}
                </span>
                <span className="font-mono text-xs text-[#4a4a48] ml-auto">
                  {colOrders.length}
                </span>
              </div>

              <div className="space-y-3">
                {colOrders.map((order: { id: number; order_id: string; customer: string; product_count: number; total: number; date: string; items?: string[] }) => (
                  <div
                    key={order.id}
                    className="p-4 rounded-lg bg-surface-base border border-[#222224] hover:border-[#d4a048]/30 transition-all duration-200 cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs text-[#d4a048] uppercase tracking-wider">
                        {order.order_id}
                      </span>
                      <span className="font-mono text-[10px] text-[#4a4a48]">
                        {order.date}
                      </span>
                    </div>

                    <div className="text-sm text-[#e8e8e6] font-medium mb-1 truncate">
                      {order.customer}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-[10px] text-[#4a4a48]">
                        {order.product_count} product{order.product_count > 1 ? "s" : ""}
                      </span>
                      <span className="font-mono text-sm text-[#d4a048] font-semibold tabular-nums">
                        ${Number(order.total).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrdersSkeleton() {
  return (
    <div>
      <Skeleton className="h-10 w-32 mb-6 bg-[#141417]" />
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-[400px] bg-[#141417] rounded-lg" />
        ))}
      </div>
    </div>
  );
}
