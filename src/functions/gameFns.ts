import type {
  pkmnData,
  pkmnFromGen,
  pkmnResponseWDex,
  pkmnResponseWSprites,
  pkmnWInfo,
} from "../types/pkmn";

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
      return id !== null ? { pkmnName: p.name, id } : null;
    })
    .filter((p: pkmnFromGen) => p !== null);
  return newPkmnArr;
};

export const getPkmnObject = async (id: number, pkmnArr: pkmnData[] | null) => {
  let pkmnWDex: pkmnResponseWDex;
  let pkmnWSprites: pkmnResponseWSprites;
  let pkmnObject: pkmnWInfo | pkmnData;

  if (pkmnArr === null) {
    pkmnWSprites = await getSpecificPkmn(id);
    pkmnWDex = await getSpecificPkmnDexEntry(id);

    pkmnObject = {
      id: id,
      pkmnName: pkmnWSprites.pkmnName,
      dexEntry:
        pkmnWDex.dexEntries[0].language.name === "en"
          ? pkmnWDex.dexEntries[0].flavor_text
          : pkmnWDex.dexEntries[0].language.name === "en"
            ? pkmnWDex.dexEntries[1].flavor_text
            : pkmnWDex.dexEntries[2].flavor_text,
      sprite: pkmnWSprites.sprites?.other["official-artwork"].front_default
        ? pkmnWSprites.sprites.other["official-artwork"].front_default
        : pkmnWSprites.sprites.other.home.front_default,
    };
    return pkmnObject;
  }
  const pkmnFromArr = pkmnArr.find((p) => p.id === id);

  if (!pkmnFromArr) {
    throw new Error(`Pokemon with id ${id} not found`);
  }

  return {
    id: pkmnFromArr.id,
    pkmnName: pkmnFromArr.pkmnName,
  };
};
