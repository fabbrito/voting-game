import type { NextPage } from "next";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";

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

  const first = trpc.useQuery(["get-pokemon-by-id", { id: firstId }]);
  const second = trpc.useQuery(["get-pokemon-by-id", { id: secondId }]);

  // const first = trpc.useQuery(["get-r6-operator-by-id", { id: firstId }]);
  // const second = trpc.useQuery(["get-r6-operator-by-id", { id: secondId }]);

  // const test = trpc.useQuery(["get-r6-operator-by-name", {name: "ace"}]);
  // if (!test.isLoading) console.log(test);

  if (first.isLoading || second.isLoading) return null;

  const voteForRoundest = (selected: number) => {
    // TODO: Fire mutations to persist changes
    updateIds(getOptionsForVote(MAX_VAL));
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which Pokémon is rounder?</div>
      <div className="p-2" />
      <div className="max-w-2xl border rounded p-8 flex justify-between items-center">
        <div className="w-48 h-full flex flex-col items-center">
          <picture className="w-full">
            <img
              src={first.data?.sprites.front_default ?? "/notFound.svg"}
              alt={first.data?.name ?? "1"}
              className="w-full"
            />
            {/* <img src={`data:image/svg+xml;utf8,${first.data?.svg}`} alt={first.data?.name} /> */}
          </picture>
          <div className="text-xl text-center capitalize mt-[-1rem] mb-2">{first.data?.name}</div>
          <button className={btn} onClick={() => voteForRoundest(firstId)}>
            Rounder
          </button>
        </div>
        <div className="p-4">Vs</div>
        <div className="w-48 h-full flex flex-col items-center">
          <picture className="w-full">
            <img
              src={second.data?.sprites.front_default ?? "/notFound.svg"}
              alt={second.data?.name ?? "2"}
              className="w-full"
            />
            {/* <img src={`data:image/svg+xml;utf8,${second.data?.svg}`} alt={second.data?.name} /> */}
          </picture>
          <div className="text-xl text-center capitalize mt-[-1rem] mb-2">{second.data?.name}</div>
          <button className={btn} onClick={() => voteForRoundest(firstId)}>
            Rounder
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
