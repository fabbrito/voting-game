import * as trpc from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/backend/utils/prisma";

import { MAX_POKEDEX_ID } from "@/utils/pokemonUtils";
import { PokemonClient } from "pokenode-ts";

// TODO: Change data to R6 ops
/* import r6Operators from "r6operators";
import { MAX_R6OPERATORS_ID } from "@/utils/r6OperatorsUtils";

export const appRouter = trpc.router()
  .query("get-r6-operator-by-id", {
    input: z.object({
      id: z.number().min(1).max(MAX_R6OPERATORS_ID),
    }),
    output: z.object({ name: z.string(), svg: z.string() }),
    async resolve({ input }) {
      const operator = Object.values(r6Operators)[input.id];
      const operatorSvg = operator.toSVG();
      if (typeof operatorSvg !== "string") return { name: operator.name, svg: "" };
      return { name: operator.name, svg: encodeURIComponent(operatorSvg) };
    },
  })
  .query("get-r6-operator-by-name", {
    input: z.object({
      name: z.string().refine(
        (op: string) => Object.keys(r6Operators).includes(op.toLowerCase()),
        (val) => ({
          message: `${val} is not a valid operator name.`,
        })
      ),
    }),
    async resolve({ input }) {
      const operator = r6Operators[input.name.toLowerCase() as keyof typeof r6Operators];
      return operator;
    },
  }); */

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
  .mutation("cast-vote", {
    input: z.object({
      votedFor: z.number().min(1).max(MAX_POKEDEX_ID),
      votedAgainst: z.number().min(1).max(MAX_POKEDEX_ID),
    }),
    async resolve({ input }) {
      const voteInDb = await prisma.vote.create({
        data: {
          votedFor: input.votedFor,
          votedAgainst: input.votedAgainst
        }
      });
      return { success: true, vote: voteInDb };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;
