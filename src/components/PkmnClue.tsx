import type { pkmn } from "../types/pkmn";
import { Pkmn } from "./Pkmn";

interface IPkmnClueProps {
  typeOfClue: "img" | "dexEntry";
  pkmn: pkmn;
}

export const PkmnClue = ({ typeOfClue, pkmn }: IPkmnClueProps) => {
  // console.log(typeOfClue, pkmn);

  return (
    <>
      <h4>PkmnClue:</h4>
      {typeOfClue === "img" ? <Pkmn pkmn={pkmn} /> : <p> DexEntry</p>}
    </>
  );
};
