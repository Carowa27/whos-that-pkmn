import type { pkmn } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: string | undefined;
  pkmn: pkmn;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  if ("dexEntries" in pkmn) {
    const textTrim = (text: string) => {
      const trimmedText = text.replace(/\f/g, " ").trim().split("\n").join(" ");
      return trimmedText;
    };
    const dexEntry =
      pkmn.dexEntries[0].language.name === "en"
        ? textTrim(pkmn.dexEntries[0].flavor_text)
        : pkmn.dexEntries[0].language.name === "en"
          ? textTrim(pkmn.dexEntries[1].flavor_text)
          : pkmn.dexEntries[2].flavor_text;
    return (
      <p
        id="dex-entry"
        dangerouslySetInnerHTML={{ __html: '"' + textTrim(dexEntry) + '"' }}
      />
    );
  }

  return (
    <div>{typeOfClue === "img" && <Pkmn pkmn={pkmn} reveal={reveal} />}</div>
  );
};
