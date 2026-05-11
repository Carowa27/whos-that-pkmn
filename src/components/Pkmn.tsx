import type { pkmnData, pkmnWInfo } from "../types/pkmn";

interface IPkmnProps {
  pkmn: pkmnWInfo | pkmnData;
  reveal: boolean;
}
export const Pkmn = ({ pkmn, reveal }: IPkmnProps) => {
  return (
    <>
      <img
        id="mystery"
        className={`pkmn-guess-img ${reveal === true ? "revealed" : ""}`}
        alt={"guess the pkmn image"}
        src={
          "sprites" in pkmn
            ? pkmn.sprites.other["official-artwork"].front_default
              ? pkmn.sprites.other["official-artwork"].front_default
              : pkmn.sprites.other.home.front_default
            : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pkmn.id}.png`
        }
      />
    </>
  );
};
