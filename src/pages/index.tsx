import type { NextPage } from "next";
import { useEffect, useState } from "react";
import type React from "react";
import { trpc } from "@/utils/trpc";
import { inferQueryResponse } from "./api/trpc/[trpc]";

import getOptionsForVote from "@/utils/getOptionsForVote";
import { MAX_POKEDEX_ID as MAX_VAL } from "@/utils/pokemonUtils";
// import { MAX_R6OPERATORS_ID as MAX_VAL } from "@/utils/r6OperatorsUtils";

const btn =
  "inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm \
  font-medium rounded-full text-gray-700 bg-white hover:bg-gray-100 \
  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const [ids, updateIds] = useState<number[]>(() => getOptionsForVote(MAX_VAL));
  const [firstId, secondId] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: firstId }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: secondId }]);

  // * To use with R6 operators
  // const first = trpc.useQuery(["get-r6-operator-by-id", { id: firstId }]);
  // const second = trpc.useQuery(["get-r6-operator-by-id", { id: secondId }]);
  // const test = trpc.useQuery(["get-r6-operator-by-name", {name: "ace"}]);
  // if (!test.isLoading) console.log(test);
  // <img src={`data:image/svg+xml;utf8,${data.svg}`} alt={data.name} />

  const voteForRoundest = (selected: number) => {
    // TODO: Fire mutations to persist changes
    updateIds(getOptionsForVote(MAX_VAL));
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is rounder?</div>
      <div className="p-2" />
      <div className="max-w-2xl border rounded p-8 flex justify-between items-center">
        {!firstPokemon.isLoading && firstPokemon.data && !secondPokemon.isLoading && secondPokemon.data && (
          <>
            <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(firstId)} />
            <div className="p-4">Vs</div>
            <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(secondId)} />
          </>
        )}
      </div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;
const PokemonListing: React.FC<{ pokemon: PokemonFromServer; vote: () => void }> = ({ pokemon, vote }) => {
  return (
    <div className="flex flex-col items-center">
      <picture className="w-48 h-48">
        <img src={pokemon.sprites.front_default ?? "/notFound.svg"} alt={pokemon.name} className="w-full" />
      </picture>
      <div className="text-xl text-center capitalize mt-[-1rem] mb-2">{pokemon.name}</div>
      <button className={btn} onClick={() => vote()}>
        Rounder
      </button>
    </div>
  );
};

export default Home;
