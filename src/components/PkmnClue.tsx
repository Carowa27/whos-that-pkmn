import type { pkmnData, pkmnWInfo } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: string | undefined;
  pkmn: pkmnWInfo | pkmnData;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  if (typeOfClue === "dex") {
    const textTrim = (text: string) => {
      const trimmedText = text.replace(/\f/g, " ").trim().split("\n").join(" ");
      return trimmedText;
    };
    const dexEntry =
      "dexEntries" in pkmn && pkmn.dexEntries !== null
        ? pkmn.dexEntries[0].language.name === "en"
          ? textTrim(pkmn.dexEntries[0].flavor_text)
          : pkmn.dexEntries[0].language.name === "en"
            ? textTrim(pkmn.dexEntries[1].flavor_text)
            : pkmn.dexEntries[2].flavor_text
        : "No pokedex entries was found";
    return (
      <p
        id="dex-entry"
        dangerouslySetInnerHTML={{ __html: '"' + textTrim(dexEntry) + '"' }}
      />
    );
  }

  return (
    <div id="pkmn-guess-img-wrapper">
      {typeOfClue === "img" && <Pkmn pkmn={pkmn} reveal={reveal} />}
    </div>
  );
};
