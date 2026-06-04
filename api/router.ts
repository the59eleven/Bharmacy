import { createRouter, publicQuery } from "./middleware";
import { productRouter } from "./routers/product";
import { orderRouter } from "./routers/order";
import { supplierRouter } from "./routers/supplier";
import { analyticsRouter } from "./routers/analytics";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  product: productRouter,
  order: orderRouter,
  supplier: supplierRouter,
  analytics: analyticsRouter,
});

export type AppRouter = typeof appRouter;
