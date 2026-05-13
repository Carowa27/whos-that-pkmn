import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Pkmn } from "../components/Pkmn";
import type { pkmnData } from "../types/pkmn";

interface ListPageProps {
  correctGuesses: pkmnData[];
  setCorrectGuesses: React.Dispatch<React.SetStateAction<pkmnData[]>>;
}

export const CorrectGuessesPage = ({
  correctGuesses,
  setCorrectGuesses,
}: ListPageProps) => {
  const removeGuessFromState = (p: pkmnData) => {
    setCorrectGuesses((prev: pkmnData[]) =>
      prev.filter((pkmn) => pkmn.id !== p.id),
    );
  };
  const resetGuessesInState = () => {
    setCorrectGuesses([]);
  };
  return (
    <>
      <Header />
      <div id="correct-head-wrapper">
        <h3>Your correct guesses</h3>
        <button id="reset-btn" onClick={() => resetGuessesInState()}>
          reset
        </button>
      </div>
      {correctGuesses.length === 0 ? (
        <p>
          You dont have any correct guesses, <br />
          go to <Link to={"/"}>Home</Link> to specify how you wanna play to
          start your journey!
        </p>
      ) : (
        <ul id="pkmn-list">
          {correctGuesses.map((p: pkmnData) => (
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
