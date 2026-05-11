import type { pkmn, pkmnFromGen } from "../types/pkmn";

import {
  getPkmnFromGeneration,
  getSpecificPkmn,
  getSpecificPkmnDexEntry,
} from "../api/getPkmn";

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
export const getTimeAttackPkmnArr = async (gen: number) => {
  const pkmnFromGen = await getPkmnFromGeneration(gen);

  const newPkmnArr = pkmnFromGen
    .map((p: pkmnFromGen) => {
      const match = p.url.match(/pokemon-species\/(\d+)\//);
      const id = match ? Number(match[1]) : null;
      return id !== null ? { name: p.name, id } : null;
    })
    .filter((p) => p !== null);
  return newPkmnArr;
};

export const getPkmnObject = async (
  id: number | null,
  pkmnArr: { name: string; id: number }[] | null,
) => {
  let pkmnWDex: pkmn;
  let pkmnWSprites: pkmn;
  let pkmnObject: pkmn;

  if (pkmnArr === null) {
    pkmnWSprites = await getSpecificPkmn(id);
    pkmnWDex = await getSpecificPkmnDexEntry(id);
    pkmnObject = {
      id: id,
      pkmnName: pkmnWSprites.pkmnName,
      dexEntries: pkmnWDex.dexEntries,
      sprites: pkmnWSprites.sprites,
    };
  } else {
    const pkmnFromArr = pkmnArr.find((p) => p.id === id);
    pkmnObject = {
      id: pkmnFromArr.id,
      pkmnName: pkmnFromArr.name,
      dexEntries: null,
      sprites: null,
    };
  }
  return pkmnObject;
};
