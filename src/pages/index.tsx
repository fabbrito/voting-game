import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [ids, setIds] = useState<number[]>(getOptionsForVote());
  const [firstId, secondId] = ids;

  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: firstId }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: secondId }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which do you preffer to play as?</div>
      <div className="p-2" />
      <div className="max-w-2xl border rounded p-8 flex justify-between items-center">
        <div className="w-64 h-64 flex flex-col">
          <picture>
            <img
              src={firstPokemon.data?.sprites.front_default ?? ""}
              alt={firstPokemon.data?.name}
              className="w-full"
            />
          </picture>
          <div className="text-xl text-center capitalize mt-[-2rem]">{firstPokemon.data?.name}</div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <picture className="w-full">
            <img
              src={secondPokemon.data?.sprites.front_default ?? ""}
              alt={secondPokemon.data?.name}
              className="w-full"
            />
          </picture>
          <div className="text-xl text-center capitalize mt-[-2rem]">{secondPokemon.data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
