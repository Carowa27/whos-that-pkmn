import type { pkmnData, pkmnWInfo } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: string | undefined;
  pkmn: pkmnWInfo | pkmnData;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  console.log("pkmnclue", typeOfClue, pkmn);

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
  if (typeOfClue === "shiny") {
    console.log("shiny clue", pkmn);
    //get img??
    return <Pkmn pkmn={pkmn} reveal={true} />;
  }
  return (
    <div id="pkmn-guess-img-wrapper">
      {typeOfClue === "img" && <Pkmn pkmn={pkmn} reveal={reveal} />}
    </div>
  );
};
