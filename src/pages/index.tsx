import type { NextPage } from "next";
// import Image from "next/image";
import { useEffect, useState } from "react";
import { trpc } from "@/utils/trpc";

import getOptionsForVote from "@/utils/getOptionsForVote";
// import { MAX_POKEDEX_ID } from "@/utils/pokemonUtils";
import { MAX_R6OPERATORS_ID } from "@/utils/r6OperatorsUtils";

const Home: NextPage = () => {
  const [ids, setIds] = useState<number[]>(getOptionsForVote(MAX_R6OPERATORS_ID));
  const [firstId, secondId] = ids;

  // const first = trpc.useQuery(["get-pokemon-by-id", { id: firstId }]);
  // const second = trpc.useQuery(["get-pokemon-by-id", { id: secondId }]);

  const first = trpc.useQuery(["get-r6-operator-by-id", { id: firstId }]);
  const second = trpc.useQuery(["get-r6-operator-by-id", { id: secondId }]);

  if (first.isLoading || second.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which do you preffer to play as?</div>
      <div className="p-2" />
      <div className="max-w-2xl border rounded p-8 flex justify-between items-center">
        <div className="w-48 h-full flex flex-col">
          <picture>
            {/* <img src={first.data?.sprites.front_default ?? ""} alt={first.data?.name} className="w-full" /> */}
            <img src={`data:image/svg+xml;utf8,${first.data?.svg}`} alt={first.data?.name} />
          </picture>
          <div className="text-xl text-center capitalize">{first.data?.name}</div>
        </div>
        <div className="p-4">Vs</div>
        <div className="w-48 h-full flex flex-col">
          <picture>
            {/* <img src={second.data?.sprites.front_default ?? ""} alt={second.data?.name} className="w-full" /> */}
            <img src={`data:image/svg+xml;utf8,${second.data?.svg}`} alt={second.data?.name} />
          </picture>
          <div className="text-xl text-center capitalize">{second.data?.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
