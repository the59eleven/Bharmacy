import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { supabase } from "../lib/supabase";

export const orderRouter = createRouter({
  list: publicQuery
    .input(
      z.object({
        search: z.string().optional(),
        status: z.string().optional(),
      }).optional()
    )
    .query(async ({ input }) => {
      let query = supabase.from("orders").select("*");

      if (input?.status) {
        query = query.eq("status", input.status);
      }

      if (input?.search) {
        query = query.or(
          `order_id.ilike.%${input.search}%,customer.ilike.%${input.search}%`
        );
      }

      const { data, error } = await query.order("id", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    }),

  getItems: publicQuery
    .input(z.object({ orderId: z.number() }))
    .query(async ({ input }) => {
      const { data, error } = await supabase
        .from("order_items")
        .select("product_name")
        .eq("order_id", input.orderId);
      if (error) throw new Error(error.message);
      return (data ?? []).map((i: { product_name: string }) => i.product_name);
    }),

  updateStatus: publicQuery
    .input(
      z.object({
        id: z.number(),
        status: z.enum(["Pending", "Processing", "Shipped", "Delivered"]),
      })
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase
        .from("orders")
        .update({ status: input.status })
        .eq("id", input.id)
        .select()
        .single();
      if (error) throw new Error(error.message);
      return data;
    }),

  stats: publicQuery.query(async () => {
    const { data, error } = await supabase.from("orders").select("status,total");
    if (error) throw new Error(error.message);

    const items = data ?? [];
    const pending = items.filter((o: { status: string }) => o.status === "Pending").length;
    const processing = items.filter(
      (o: { status: string }) => o.status === "Processing"
    ).length;
    const shipped = items.filter((o: { status: string }) => o.status === "Shipped").length;
    const revenue = items
      .filter((o: { status: string }) => o.status === "Delivered")
      .reduce((s: number, o: { total: number }) => s + Number(o.total), 0);

    return { pending, processing, shipped, revenue };
  }),

  recent: publicQuery.query(async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("id", { ascending: false })
      .limit(5);
    if (error) throw new Error(error.message);
    return data ?? [];
  }),
});
