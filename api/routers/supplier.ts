import { z } from "zod";
import { createRouter, publicQuery } from "../middleware";
import { supabase } from "../lib/supabase";

export const supplierRouter = createRouter({
  list: publicQuery
    .input(z.object({ search: z.string().optional() }).optional())
    .query(async ({ input }) => {
      let query = supabase.from("suppliers").select("*");

      if (input?.search) {
        query = query.or(
          `name.ilike.%${input.search}%,code.ilike.%${input.search}%`
        );
      }

      const { data, error } = await query;
      if (error) throw new Error(error.message);
      return data ?? [];
    }),

  stats: publicQuery.query(async () => {
    const { data, error } = await supabase.from("suppliers").select("avg_margin,product_count");
    if (error) throw new Error(error.message);

    const items = data ?? [];
    const avgMargin =
      items.length > 0
        ? Math.round(
            items.reduce((s: number, i: { avg_margin: number }) => s + i.avg_margin, 0) /
              items.length
          )
        : 0;
    const totalProducts = items.reduce(
      (s: number, i: { product_count: number }) => s + i.product_count,
      0
    );

    return { avgMargin, totalProducts, count: items.length };
  }),
});
