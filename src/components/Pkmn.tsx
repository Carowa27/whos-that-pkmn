import type { pkmnWSprite } from "../types/pkmn";

interface IPkmnProps {
  pkmn: pkmnWSprite;
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
          pkmn.sprites.other["official-artwork"].front_default
            ? pkmn.sprites.other["official-artwork"].front_default
            : pkmn.sprites.other.home.front_default
        }
      />
    </>
  );
};
