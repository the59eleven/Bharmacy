import { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown, Plus } from "lucide-react";
import { trpc } from "@/providers/trpc";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductsTabProps {
  searchQuery: string;
}

const productTypes = ["All", "Research Peptide", "Growth Factor", "Nootropic"];

export default function ProductsTab({ searchQuery }: ProductsTabProps) {
  const [activeFilter, setActiveFilter] = useState("All");
  const [sortKey, setSortKey] = useState<string>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const { data: products, isLoading } = trpc.product.list.useQuery({
    search: searchQuery || undefined,
    type: activeFilter !== "All" ? activeFilter : undefined,
    sortKey,
    sortDir,
  });

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const getStockColor = (stock: number) => {
    if (stock > 20) return "text-[#4ade80]";
    if (stock >= 10) return "text-[#d4a048]";
    return "text-[#f87171]";
  };

  const getStatusColor = (status: string) => {
    if (status === "In Stock") return "text-[#4ade80]";
    if (status === "Low Stock") return "text-[#d4a048]";
    return "text-[#f87171]";
  };

  const getStatusDot = (status: string) => {
    if (status === "In Stock") return "bg-[#4ade80]";
    if (status === "Low Stock") return "bg-[#d4a048]";
    return "bg-[#f87171]";
  };

  const getMarkupBadge = (markup: number) => {
    if (markup >= 70) return "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/20";
    if (markup >= 50) return "bg-[#d4a048]/10 text-[#d4a048] border-[#d4a048]/20";
    return "bg-[#f87171]/10 text-[#f87171] border-[#f87171]/20";
  };

  const SortIcon = ({ col }: { col: string }) => {
    if (sortKey !== col) return <ArrowUpDown size={12} className="text-[#4a4a48]" />;
    return sortDir === "asc" ? (
      <ArrowUp size={12} className="text-[#d4a048]" />
    ) : (
      <ArrowDown size={12} className="text-[#d4a048]" />
    );
  };

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-geist font-light text-3xl text-[#e8e8e6] tracking-[-0.03em]">
          Product Catalog
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#d4a048] text-[#040405] rounded-lg text-sm font-mono uppercase tracking-wider hover:bg-[#c09040] transition-colors">
          <Plus size={14} />
          Add Product
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {productTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveFilter(type)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider border transition-all duration-200 ${
              activeFilter === type
                ? "bg-[#141417] border-[#d4a048] text-[#d4a048]"
                : "border-[#222224] text-[#8a8a88] hover:text-[#e8e8e6] hover:border-[#4a4a48]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="rounded-lg overflow-hidden" style={{ border: "1px solid #222224" }}>
        <table className="w-full">
          <thead>
            <tr className="text-left" style={{ borderBottom: "1px solid #222224" }}>
              {[
                ["Product", "name"],
                ["Type", "type"],
                ["Supplier", "supplier"],
                ["Stock", "stock"],
                ["Unit Cost", "unit_cost"],
                ["Markup", "markup"],
                ["Our Price", "our_price"],
                ["Status", "status"],
              ].map(([label, key]) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#8a8a88] cursor-pointer hover:text-[#e8e8e6] select-none transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {label}
                    <SortIcon col={key} />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((product: Record<string, unknown>) => (
              <tr
                key={product.id as number}
                className="group transition-all duration-150 hover:bg-[#141417] cursor-default"
                style={{ borderBottom: "1px solid #222224" }}
              >
                <td className="px-4 py-3">
                  <div>
                    <span className="text-sm text-[#e8e8e6] font-medium">
                      {product.name as string}
                    </span>
                    <div className="font-mono text-[10px] text-[#4a4a48] mt-0.5">
                      {product.cas_number as string}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-[#141417] border border-[#222224] text-[#8a8a88]">
                    {product.type as string}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-[#e8e8e6]">
                    {product.supplier as string}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`font-mono text-sm tabular-nums ${getStockColor(product.stock as number)}`}>
                    {product.stock as number}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-[#e8e8e6] tabular-nums">
                    ${Number(product.unit_cost).toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-mono border ${getMarkupBadge(product.markup as number)}`}>
                    {product.markup as number}%
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-[#d4a048] font-semibold tabular-nums">
                    ${Number(product.our_price).toFixed(2)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(product.status as string)}`} />
                    <span className={`text-xs ${getStatusColor(product.status as string)}`}>
                      {product.status as string}
                    </span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductsSkeleton() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <Skeleton className="h-10 w-48 bg-[#141417]" />
        <Skeleton className="h-9 w-32 bg-[#141417]" />
      </div>
      <div className="flex gap-2 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-7 w-24 bg-[#141417] rounded-full" />
        ))}
      </div>
      <Skeleton className="h-[500px] bg-[#141417] rounded-lg" />
    </div>
  );
}
