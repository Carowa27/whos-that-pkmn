import type { pkmnData } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: string | undefined;
  pkmn: pkmnData;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  if (typeOfClue === "dex") {
    const textTrim = (text: string) => {
      const trimmedText = text.replace(/\f/g, " ").trim().split("\n").join(" ");
      return trimmedText;
    };
    const dexEntry =
      "dexEntry" in pkmn && pkmn.dexEntry !== null
        ? textTrim(pkmn.dexEntry)
        : "No pokedex entries was found";
    return (
      <p
        id="dex-entry"
        dangerouslySetInnerHTML={{ __html: '"' + textTrim(dexEntry) + '"' }}
      />
    );
  }
  if (typeOfClue === "shiny" || typeOfClue === "not-shiny") {
    const shinyPkmn = {
      id: pkmn.id,
      pkmnName: pkmn.pkmnName,
      sprite:
        typeOfClue === "shiny"
          ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pkmn.id}.png`
          : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmn.id}.png`,
      dexEntry: null,
    };
    return <Pkmn pkmn={shinyPkmn} reveal={true} />;
  }
  return (
    <div id="pkmn-guess-img-wrapper">
      {typeOfClue === "img" && <Pkmn pkmn={pkmn} reveal={reveal} />}
    </div>
  );
};
