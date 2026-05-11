import { Link, useParams } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";

import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { NewGameBtns } from "../components/NewGameBtns";
import { Loading } from "../components/Loading";

import type { pkmn } from "../types/pkmn";
import type { GameState } from "../types/game";
import { Header } from "../components/Header";
import {
  getGenIds,
  getPkmnObject,
  getTimeAttackPkmnArr,
} from "../functions/gameFns";

interface GameProps {
  setCorrectGuesses: React.Dispatch<React.SetStateAction<pkmn[]>>;
  correctGuesses: pkmn[];
  error: { error: boolean; msg: string };
  setError: React.Dispatch<
    React.SetStateAction<{ error: boolean; msg: string }>
  >;
}

export const Game = ({
  correctGuesses,
  setCorrectGuesses,
  error,
  setError,
}: GameProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const [gameState, setGameState] = useState<GameState>({
    alternatives: [],
    correct: null,
    guess: "",
    reveal: false,
  });
  const { gameMode, gen, clueType, alternativeType } = useParams();
  const [timeAttackCorrectGuesses, setTimeAttackCorrectGuesses] = useState([]);
  const [timeAttackPkmnArr, setTimeAttackPkmnArr] = useState<
    {
      name: string;
      id: number;
    }[]
  >([]);
  const [timeAttack, setTimeAttack] = useState({ game: "", time: 0 });
  const correct = gameState.correct;

  const resetGame = () => {
    setGameState({
      alternatives: [],
      correct: null,
      guess: "",
      reveal: false,
    });
  };

  const getRandomNumbers = (low: number, high: number, array: pkmn[]) => {
    const excludedIds = new Set(
      array.length !== 0 ? array.map((p) => p.id) : [],
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
      const ids = getRandomNumbers(
        low,
        high,
        gameMode === "regular" ? correctGuesses : timeAttackCorrectGuesses,
      );
      resetGame();

      const alternatives = await Promise.all(
        ids.map((id) =>
          getPkmnObject(id, gameMode === "regular" ? null : timeAttackPkmnArr),
        ),
      );

      const correct = alternatives[0];

      alternatives.sort(() => Math.random() - 0.5);

      setGameState((prevState) => ({
        ...prevState,
        correct: correct,
        alternatives: alternatives,
      }));
    } catch (error) {
      setError({
        error: true,
        msg: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 350);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTimeAttack({ game: "not-started", time: 0 });
    const fetchData = async () => {
      setTimeAttackPkmnArr(
        await getTimeAttackPkmnArr(Number(gen.replace("gen", ""))),
      );
    };
    if (gameMode === "time-attack" && timeAttackPkmnArr.length === 0) {
      fetchData();
    } else {
      newGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (timeAttackPkmnArr.length !== 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      newGame();
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeAttackPkmnArr]);

  const handleGuess = (e: ChangeEvent<HTMLFormElement, Element>) => {
    setGameState((prevState) => ({
      ...prevState,
      reveal: true,
    }));
    if (alternativeType === "multiple" || gameMode === "time-attack") {
      if (!correct) return;

      if (e.target.value === correct.pkmnName) {
        setGameState((prev) => ({ ...prev, guess: "correct" }));
        if (gameMode === "regular") {
          setCorrectGuesses((prev) => [...prev, correct]);
        } else {
          setTimeAttackCorrectGuesses((prev) => [...prev, correct]);
        }
        if (gameMode === "time-attack") {
          setTimeout(() => {
            newGame();
          }, 1000);
        }
      } else {
        setGameState((prev) => ({ ...prev, guess: "wrong" }));
        if (gameMode === "time-attack") {
          setTimeout(() => {
            newGame();
          }, 1000);
        }
      }
    } else {
      console.log(e.target.value);
    }
  };

  const startTimer = () => {
    setTimeAttack({ game: "started", time: 0 });

    setInterval(() => {
      setTimeAttack((prev) => ({ ...prev, time: prev.time + 1 }));
    }, 1000);
  };

  useEffect(() => {
    if (correct === undefined && timeAttack.game === "started") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeAttack({ game: "ended", time: timeAttack.time });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correct]);
  return (
    <>
      {error.error ? (
        <p>{error.msg}</p>
      ) : (
        <>
          <div id="game-header">
            <Header />
            {gameMode === "time-attack" && (
              <section id="time-attack-info-section">
                <p>Status: {timeAttack.game.replace("-", " ")}</p>
                <p>
                  Time: {Math.floor(timeAttack.time / 60)}:
                  {String(timeAttack.time % 60).padStart(2, "0")}
                </p>
              </section>
            )}

            {gameState.guess === "correct" && correct && (
              <>
                <h2 className="guess-header">
                  <span className="correct">Correct!</span>
                  <br /> It is{" "}
                  {correct.pkmnName.charAt(0).toUpperCase() +
                    correct.pkmnName.slice(1)}
                  !
                </h2>
                {gameMode === "time-attack" && (
                  <p className="center">
                    pkmn left to guess:
                    {Math.abs(
                      timeAttackCorrectGuesses.length -
                        timeAttackPkmnArr.length,
                    )}
                  </p>
                )}
              </>
            )}
            {gameState.guess === "wrong" && correct && (
              <>
                <h2 className="guess-header">
                  <span className="wrong">Wrong!</span>
                  <br /> It is{" "}
                  {correct.pkmnName.charAt(0).toUpperCase() +
                    correct.pkmnName.slice(1)}
                  !
                </h2>
                {gameMode === "time-attack" && (
                  <p className="center">
                    pkmn left to guess:
                    {Math.abs(
                      timeAttackCorrectGuesses.length -
                        timeAttackPkmnArr.length,
                    )}
                  </p>
                )}
              </>
            )}
          </div>
          {isLoading && <Loading />}
          {!isLoading && gameMode === "regular" && correct === undefined && (
            <h3 className="center correct">
              Congratulations!
              <br /> You have guessed all Correct!
            </h3>
          )}
          {!isLoading &&
            gameMode === "time-attack" &&
            correct === undefined && (
              <>
                <h3 className="center correct">
                  Congratulations!
                  <br /> You have guessed all Correct!
                </h3>
                {timeAttack.game === "ended" && (
                  <p className="center">Your time is {timeAttack.time}</p>
                )}
              </>
            )}
          {gameMode === "time-attack" && timeAttack.game === "not-started" ? (
            <>
              <h3 className="center">Are you ready?</h3>
              <button onClick={() => (newGame(), startTimer())}>
                Start game
              </button>
            </>
          ) : (
            <>
              {!isLoading && (
                <>
                  {gameState.alternatives.length !== 0 && correct !== null ? (
                    <>
                      <PkmnClue
                        typeOfClue={
                          clueType || (gameMode === "time-attack" && "img")
                        }
                        pkmn={correct}
                        reveal={gameState.reveal}
                      />
                      {gameState.guess === "" ? (
                        <PkmnGuessInput
                          typeOfAnswer={
                            alternativeType ||
                            (gameMode === "time-attack" && "multiple")
                          }
                          alternatives={gameState.alternatives}
                          handleGuess={(e) => handleGuess(e)}
                        />
                      ) : gameMode !== "time-attack" ? (
                        <NewGameBtns startNewGame={() => newGame()} />
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <>
                      {gameMode !== "time-attack" && (
                        <p>
                          Congratulations, you have guessed all pokemon correct
                          in this pokedex!
                          <br /> Either <Link to={"/"}>
                            choose another one
                          </Link>{" "}
                          or reset your guesses at the{" "}
                          <Link to={"/correct-guesses"}>correct guesses</Link>{" "}
                          page!
                        </p>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
