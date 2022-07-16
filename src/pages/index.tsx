import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { trpc } from "@/utils/trpc";
import type { NextPage } from "next";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [data, setData] = useState<{ first: number; second: number }>();

  useEffect(() => {
    const data = getOptionsForVote();
    setData({ first: data[0], second: data[1] });
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-2xl text-center">Which is the roundest?</div>
      <div className="p-2" />
      <div className="max-w-2xl border rounded p-8 flex justify-between items-center">
        <div className="w-16 h-16 bg-red-500">{data?.first ?? ""}</div>
        <div className="p-8">Vs</div>
        <div className="w-16 h-16 bg-red-500">{data?.second ?? ""}</div>
      </div>
    </div>
  );
};

export default Home;
