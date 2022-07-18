import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "@/backend/router/index";
import type { AppRouter } from "@/backend/router/index";
import { inferProcedureOutput } from "@trpc/server";

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});

// infer types from the server
export type inferQueryResponse<TRouteKey extends keyof AppRouter["_def"]["queries"]> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;
