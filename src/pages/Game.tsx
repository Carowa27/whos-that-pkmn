import { useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";

import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { NewGameBtns } from "../components/NewGameBtns";
import { Loading } from "../components/Loading";

import type { pkmn } from "../types/pkmn";
import type { GameState } from "../types/game";
import { Header } from "../components/Header";
import { getGenIds, getPkmnObject } from "../functions/functions";

interface GameProps {
  setCorrectGuesses: React.Dispatch<React.SetStateAction<pkmn[]>>;
}

export const Game = ({ setCorrectGuesses }: GameProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    alternatives: [],
    correct: {
      id: 0,
      pkmnName: "",
      dexEntries: null,
      sprites: null,
    },
    guess: "",
    reveal: false,
  });
  const { gen, clueType, alternativeType } = useParams();

  const newGame = async () => {
    setIsLoading(true);
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

      const [p0, p1, p2] = await Promise.all([
        getPkmnObject(ids[0]),
        getPkmnObject(ids[1]),
        getPkmnObject(ids[2]),
      ]);
      const correct = p1;
      const alternatives = [p0, p1, p2].sort(() => Math.random() - 0.5);

      setGameState((prevState) => ({
        ...prevState,
        correct: correct,
        alternatives: alternatives,
      }));
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    newGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetGame = () => {
    setGameState({
      alternatives: [],
      correct: {
        id: 0,
        pkmnName: "",
        dexEntries: null,
        sprites: null,
      },
      guess: "",
      reveal: false,
    });
  };

  const getRandomNumbers = (low: number, high: number) => {
    const ids = Array.from({ length: high - low + 1 }, (_, i) => i + low)
      .filter((id) => id !== gameState.correct.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return ids;
  };

  const handleGuess = (e: ChangeEvent<HTMLFormElement, Element>) => {
    setGameState((prevState) => ({
      ...prevState,
      reveal: true,
    }));
    if (alternativeType === "multiple") {
      if (gameState.correct && e.target.value === gameState.correct.pkmnName) {
        setGameState((prevState) => ({
          ...prevState,
          guess: "correct",
        }));

        setCorrectGuesses((prev) => [...prev, gameState.correct]);
      } else {
        setGameState((prevState) => ({
          ...prevState,
          guess: "wrong",
        }));
      }
    } else {
      console.log(e.target.value);
    }
  };
  return (
    <>
      <div id="game-header">
        <Header />
        {gameState.guess === "correct" && gameState.correct && (
          <h2 className="guess-header">
            <span id="correct">Correct!</span>
            <br /> It is{" "}
            {gameState.correct.pkmnName.charAt(0).toUpperCase() +
              gameState.correct.pkmnName.slice(1)}
            !
          </h2>
        )}
        {gameState.guess === "wrong" && gameState.correct && (
          <h2 className="guess-header">
            <span id="wrong">Wrong!</span>
            <br /> It is{" "}
            {gameState.correct.pkmnName.charAt(0).toUpperCase() +
              gameState.correct.pkmnName.slice(1)}
            !
          </h2>
        )}
      </div>
      {isLoading && <Loading />}
      {!isLoading &&
        gameState.alternatives.length !== 0 &&
        gameState.correct !== null && (
          <>
            <PkmnClue
              typeOfClue={clueType}
              pkmn={gameState.correct}
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
  );
};
