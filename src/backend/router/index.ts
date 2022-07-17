import * as trpc from "@trpc/server";
import { z } from "zod";

import { MAX_POKEDEX_ID } from "@/utils/pokemonUtils";
import { PokemonClient } from "pokenode-ts";

import r6Operators from "r6operators";
import { MAX_R6OPERATORS_ID } from "@/utils/r6OperatorsUtils";

export const appRouter = trpc
  .router()
  .query("get-pokemon-by-id", {
    input: z.object({ id: z.number().min(1).max(MAX_POKEDEX_ID) }),
    async resolve({ input }) {
      const api = new PokemonClient();
      const pokemon = await api.getPokemonById(input.id);
      return { name: pokemon.name, sprites: pokemon.sprites };
    },
  })
  .query("get-r6-operator-by-id", {
    input: z.object({
      id: z.number().min(1).max(MAX_R6OPERATORS_ID),
    }),
    async resolve({ input }) {
      const operator = Object.values(r6Operators)[input.id];
      const operatorSvg = operator.toSVG();
      if (typeof operatorSvg !== "string") return { name: operator.name, svgURIencoded: "" };
      return { name: operator.name, svgURIencoded: encodeURIComponent(operatorSvg) };
    },
  })
  .query("get-r6-operator-by-name", {
    input: z.object({ id: z.string().min(1).max(100) }),
    async resolve({ input }) {
      const operator = r6Operators[input.id.toLowerCase() as keyof typeof r6Operators];
      return operator;
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
