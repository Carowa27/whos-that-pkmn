import type { pkmn } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: "img" | "dexEntry";
  pkmn: pkmn;
  reveal: boolean;
}

export const PkmnClue = ({ typeOfClue, pkmn, reveal }: IPkmnClueProps) => {
  // console.log(typeOfClue, pkmn);

  return (
    <>
      <h4>PkmnClue:</h4>
      {typeOfClue === "img" ? (
        <Pkmn pkmn={pkmn} reveal={reveal} />
      ) : (
        <p> DexEntry</p>
      )}
    </>
  );
};
