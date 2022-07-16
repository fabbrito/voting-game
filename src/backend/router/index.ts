import * as trpc from "@trpc/server";
import { z } from "zod";
import { MAX_POKEDEX_ID } from "@/utils/getRandomPokemon";
import { PokemonClient } from "pokenode-ts";

export const appRouter = trpc.router().query("get-pokemon-by-id", {
  input: z.object({ id: z.number().min(1).max(MAX_POKEDEX_ID) }),
  async resolve({ input }) {
    const api = new PokemonClient();
    const pokemon = await api.getPokemonById(input.id);
    return pokemon;
  },
});

// export type definition of API
export type AppRouter = typeof appRouter;
