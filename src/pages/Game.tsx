import { useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";

import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { NewGameBtns } from "../components/NewGameBtns";
import { Loading } from "../components/Loading";

import type { pkmn } from "../types/pkmn";
import type { GameState } from "../types/game";
import { Header } from "../components/Header";
import { getGenIds, getPkmnObject } from "../functions/gameFns";

interface GameProps {
  setCorrectGuesses: React.Dispatch<React.SetStateAction<pkmn[]>>;
  correctGuesses: pkmn[];
}

export const Game = ({ correctGuesses, setCorrectGuesses }: GameProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ error: boolean; msg: string }>({
    error: false,
    msg: "",
  });

  const [gameState, setGameState] = useState<GameState>({
    alternatives: [],
    correct: null,
    guess: "",
    reveal: false,
  });
  const { gen, clueType, alternativeType } = useParams();
  const correct = gameState.correct;

  const resetGame = () => {
    setGameState({
      alternatives: [],
      correct: null,
      guess: "",
      reveal: false,
    });
  };

  const getRandomNumbers = (low: number, high: number) => {
    const excludedIds = new Set(
      correctGuesses.length !== 0 ? correctGuesses.map((p) => p.id) : [],
    );
    const ids = Array.from({ length: high - low + 1 }, (_, i) => i + low)
      .filter((id) => !excludedIds.has(id))
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    return ids;
  };

  const newGame = async () => {
    setIsLoading(true);
    setError({ error: false, msg: "" });
    try {
      let low = 1;
      let high = 1025;

      if (gen !== "nat" && gen !== undefined) {
        const generation = Number(gen.replace("gen", ""));
        const genIds = await getGenIds(generation);
        low = genIds.low;
        high = genIds.high;
      }
      const ids = getRandomNumbers(low, high);
      resetGame();

      const alternatives = await Promise.all(
        ids.map((id) => getPkmnObject(id)),
      );
      const correct = alternatives[0];

      alternatives.sort(() => Math.random() - 0.5);

      setGameState((prevState) => ({
        ...prevState,
        correct: correct,
        alternatives: alternatives,
      }));
    } catch (error) {
      setError({ error: true, msg: error.message });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 350);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGuess = (e: ChangeEvent<HTMLFormElement, Element>) => {
    setGameState((prevState) => ({
      ...prevState,
      reveal: true,
    }));
    if (alternativeType === "multiple") {
      if (!correct) return;

      if (e.target.value === correct.pkmnName) {
        setGameState((prev) => ({ ...prev, guess: "correct" }));
        setCorrectGuesses((prev) => [...prev, correct]);
      } else {
        setGameState((prev) => ({ ...prev, guess: "wrong" }));
      }
    } else {
      console.log(e.target.value);
    }
  };
  return (
    <>
      {error.error ? (
        <p>{error.msg}</p>
      ) : (
        <>
          <div id="game-header">
            <Header />
            {gameState.guess === "correct" && correct && (
              <h2 className="guess-header">
                <span className="correct">Correct!</span>
                <br /> It is{" "}
                {correct.pkmnName.charAt(0).toUpperCase() +
                  correct.pkmnName.slice(1)}
                !
              </h2>
            )}
            {gameState.guess === "wrong" && correct && (
              <h2 className="guess-header">
                <span className="wrong">Wrong!</span>
                <br /> It is{" "}
                {correct.pkmnName.charAt(0).toUpperCase() +
                  correct.pkmnName.slice(1)}
                !
              </h2>
            )}
          </div>
          {isLoading && <Loading />}
          {!isLoading && correct === undefined && (
            <h3 className="center correct">
              Congratulations!
              <br /> You have guessed all Correct!
            </h3>
          )}
          {!isLoading &&
            gameState.alternatives.length !== 0 &&
            correct !== null && (
              <>
                <PkmnClue
                  typeOfClue={clueType}
                  pkmn={correct}
                  reveal={gameState.reveal}
                />
                {gameState.guess === "" ? (
                  <PkmnGuessInput
                    typeOfAnswer={alternativeType}
                    alternatives={gameState.alternatives}
                    handleGuess={(e) => handleGuess(e)}
                  />
                ) : (
                  <NewGameBtns startNewGame={() => newGame()} />
                )}
              </>
            )}
        </>
      )}
    </>
  );
};
