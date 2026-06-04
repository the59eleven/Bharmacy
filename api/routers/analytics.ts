import { createRouter, publicQuery } from "../middleware";
import { supabase } from "../lib/supabase";

export const analyticsRouter = createRouter({
  summary: publicQuery.query(async () => {
    const [productsRes, ordersRes, suppliersRes] = await Promise.all([
      supabase.from("products").select("stock,status,markup"),
      supabase.from("orders").select("status,total,date"),
      supabase.from("suppliers").select("avg_margin,product_count,name"),
    ]);

    if (productsRes.error) throw new Error(productsRes.error.message);
    if (ordersRes.error) throw new Error(ordersRes.error.message);
    if (suppliersRes.error) throw new Error(suppliersRes.error.message);

    const products = productsRes.data ?? [];
    const orders = ordersRes.data ?? [];
    const suppliers = suppliersRes.data ?? [];

    const inStock = products.filter((p: { stock: number }) => p.stock > 20).length;
    const lowStock = products.filter(
      (p: { stock: number }) => p.stock > 0 && p.stock <= 20
    ).length;
    const outOfStock = products.filter(
      (p: { status: string }) => p.status === "Out of Stock"
    ).length;

    const pending = orders.filter((o: { status: string }) => o.status === "Pending").length;
    const processing = orders.filter(
      (o: { status: string }) => o.status === "Processing"
    ).length;

    const revenue = orders
      .filter((o: { status: string }) => o.status === "Delivered")
      .reduce((s: number, o: { total: number }) => s + Number(o.total), 0);

    const avgMargin =
      products.length > 0
        ? Math.round(
            products.reduce((s: number, p: { markup: number }) => s + p.markup, 0) /
              products.length
          )
        : 0;

    const supplierMargins = suppliers.map((s: { name: string; avg_margin: number }) => ({
      name: s.name,
      margin: s.avg_margin,
    }));

    const monthlyRevenue: Record<string, number> = {};
    orders.forEach((o: { date: string; total: number; status: string }) => {
      if (o.status === "Delivered") {
        const month = o.date.slice(5, 7);
        const monthNames: Record<string, string> = {
          "01": "Jan", "02": "Feb", "03": "Mar", "04": "Apr", "05": "May", "06": "Jun",
          "07": "Jul", "08": "Aug", "09": "Sep", "10": "Oct", "11": "Nov", "12": "Dec",
        };
        const label = monthNames[month] ?? month;
        monthlyRevenue[label] = (monthlyRevenue[label] ?? 0) + Number(o.total);
      }
    });

    return {
      inventory: { inStock, lowStock, outOfStock, total: products.length },
      orders: { pending, processing, revenue },
      avgMargin,
      supplierMargins,
      monthlyRevenue,
    };
  }),
});
