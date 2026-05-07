import { Header } from "../components/Header";
import { Pkmn } from "../components/Pkmn";
import type { pkmn } from "../types/pkmn";

interface ListPageProps {
  correctGuesses: pkmn[];
  setCorrectGuesses: React.Dispatch<React.SetStateAction<pkmn[]>>;
}

export const PkmnList = ({
  correctGuesses,
  setCorrectGuesses,
}: ListPageProps) => {
  const removeGuessFromState = (p: pkmn) => {
    setCorrectGuesses((prev: pkmn[]) =>
      prev.filter((pkmn) => pkmn.id !== p.id),
    );
  };
  return (
    <>
      <Header />
      <h3>Your correct guesses</h3>
      <ul id="pkmn-list">
        {correctGuesses.map((p: pkmn) => (
          <li key={p.id + "-" + p.pkmnName} id="correct-guess-wrapper">
            <Pkmn pkmn={p} reveal={true} />
            <span
              id="trash-icon"
              className="button icon-btn"
              onClick={() => removeGuessFromState(p)}
            >
              &#xe020;
            </span>
          </li>
        ))}
      </ul>
    </>
  );
};
