import type { pkmnWDex, pkmnWSprite } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: "img" | "dexEntry";
  pkmn: pkmnWSprite | pkmnWDex;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  console.log(typeOfClue, pkmn);
  const textTrim = (text: string) => {
    const trimmedText = text
      .replace(/\f/g, " ")
      .trim()
      .split("\n")
      .join("<br/>");
    return trimmedText;
  };
  const dexEntry =
    "dexEntries" in pkmn &&
    (pkmn.dexEntries[0].language.name === "en"
      ? textTrim(pkmn.dexEntries[0].flavor_text)
      : pkmn.dexEntries[0].language.name === "en"
        ? textTrim(pkmn.dexEntries[1].flavor_text)
        : pkmn.dexEntries[2].flavor_text);
  console.log(dexEntry);

  console.log(textTrim(dexEntry));
  return (
    <div>
      <h4>PkmnClue:</h4>
      {typeOfClue === "img" ? (
        <Pkmn pkmn={pkmn} reveal={reveal} />
      ) : (
        <p dangerouslySetInnerHTML={{ __html: textTrim(dexEntry) }} />
      )}
    </div>
  );
};
