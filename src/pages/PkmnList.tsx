import type { pkmn } from "../types/pkmn";

interface ListPageProps {
  correctGuesses: pkmn[];
}

export const PkmnList = ({ correctGuesses }: ListPageProps) => {
  console.log(correctGuesses);

  return (
    <>
      PkmnList
      {/* <Pkmn pkmn={undefined} reveal={false} /> */}
    </>
  );
};
