import type { pkmnFromGen } from "./types/pkmn";

import { getPkmnFromGeneration } from "./api/getPkmn";

export const getGenIds = async (gen: number) => {
  const pkmnFromGen = await getPkmnFromGeneration(gen);

  const ids = pkmnFromGen
    .map((p: pkmnFromGen) => {
      const match = p.url.match(/pokemon-species\/(\d+)\//);
      return match ? Number(match[1]) : null;
    })
    .filter((id: number) => id !== null);

  const low = Math.min(...ids);
  const high = Math.max(...ids);
  return { low, high };
};
