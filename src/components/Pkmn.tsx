import type { pkmn } from "../types/pkmn";

interface IPkmnProps {
  pkmn: pkmn;
}
export const Pkmn = ({ pkmn }: IPkmnProps) => {
  return (
    <>
      <img
        src={pkmn.sprites.other["official-artwork"].front_default}
        alt={"guess the pkmn image"}
        srcSet={pkmn.sprites.other.home.front_default}
      />
    </>
  );
};
