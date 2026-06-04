import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { supabase } from "../lib/supabase";

export const productRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        search: z.string().optional(),
        type: z.string().optional(),
        sortKey: z.string().optional(),
        sortDir: z.enum(["asc", "desc"]).optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      let query = supabase.from("products").select("*");

      if (input?.type && input.type !== "All") {
        query = query.eq("type", input.type);
      }

      if (input?.search) {
        query = query.or(
          `name.ilike.%${input.search}%,sku.ilike.%${input.search}%,supplier.ilike.%${input.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);

      let results = data ?? [];

      if (input?.sortKey) {
        const key = input.sortKey;
        const dir = input.sortDir ?? "asc";
        results.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
          const aVal = a[key];
          const bVal = b[key];
          if (typeof aVal === "string" && typeof bVal === "string") {
            return dir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
          }
          if (typeof aVal === "number" && typeof bVal === "number") {
            return dir === "asc" ? aVal - bVal : bVal - aVal;
          }
          return 0;
        });
      }

      return results;
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", input.id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    }),

  updateStock: publicQuery
    .input(z.object({ id: z.number(), stock: z.number() }))
    .mutation(async ({ input }) => {
      const status =
        input.stock > 20 ? "In Stock" : input.stock > 0 ? "Low Stock" : "Out of Stock";
      const { data, error } = await supabase
        .from("products")
        .update({ stock: input.stock, status })
        .eq("id", input.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }),

  stats: publicQuery.query(async () => {
    const { data, error } = await supabase.from("products").select("stock,status");
    if (error) throw new Error(error.message);

    const items = data ?? [];
    const inStock = items.filter((p: { stock: number }) => p.stock > 20).length;
    const lowStock = items.filter(
      (p: { stock: number; status: string }) => p.stock > 0 && p.stock <= 20
    ).length;
    const outOfStock = items.filter(
      (p: { status: string }) => p.status === "Out of Stock"
    ).length;

    return { inStock, lowStock, outOfStock, total: items.length };
  }),
});
