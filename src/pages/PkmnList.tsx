import { Link } from "react-router-dom";
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
      {correctGuesses.length === 0 ? (
        <p>
          You dont have any correct guesses, go to <Link to={"/"}>Home</Link> to
          specify how you wanna play to start your journey!
        </p>
      ) : (
        <ul id="pkmn-list">
          {correctGuesses.map((p: pkmn) => (
            <li key={p.id + "-" + p.pkmnName} id="correct-guess-wrapper">
              <Pkmn pkmn={p} reveal={true} />
              <span
                id="trash-icon"
                className="button icon-btn"
                onClick={() => removeGuessFromState(p)}
              >
                ✕
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};
