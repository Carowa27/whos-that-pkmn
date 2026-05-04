import type { pkmnWDex, pkmnWSprite } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: "img" | "dexEntry";
  pkmn: pkmnWSprite | pkmnWDex;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  if ("dexEntries" in pkmn) {
    const textTrim = (text: string) => {
      const trimmedText = text
        .replace(/\f/g, " ")
        .trim()
        .split("\n")
        .join("<br/>");
      return trimmedText;
    };
    const dexEntry =
      pkmn.dexEntries[0].language.name === "en"
        ? textTrim(pkmn.dexEntries[0].flavor_text)
        : pkmn.dexEntries[0].language.name === "en"
          ? textTrim(pkmn.dexEntries[1].flavor_text)
          : pkmn.dexEntries[2].flavor_text;
    console.log(pkmn);
    return (
      <p
        id="dex-entry"
        dangerouslySetInnerHTML={{ __html: textTrim(dexEntry) }}
      />
    );
  }

  return (
    <div>
      <h4>PkmnClue:</h4>
      {typeOfClue === "img" && <Pkmn pkmn={pkmn} reveal={reveal} />}
    </div>
  );
};
