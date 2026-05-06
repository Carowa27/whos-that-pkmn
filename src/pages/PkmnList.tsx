import { Pkmn } from "../components/Pkmn";
import type { pkmn } from "../types/pkmn";

interface ListPageProps {
  correctGuesses: pkmn[];
}

export const PkmnList = ({ correctGuesses }: ListPageProps) => {
  console.log(correctGuesses);

  return (
    <>
      <h3>Your correct guesses</h3>
      <ul id="pkmn-list">
        {correctGuesses.map((p: pkmn) => (
          <li key={p.id + "-" + p.pkmnName}>
            <Pkmn pkmn={p} reveal={true} />
          </li>
        ))}
      </ul>
    </>
  );
};
