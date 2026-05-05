import { useLocation } from "react-router-dom";
import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import {
  getPkmnFromGeneration,
  getSpecificPkmn,
  getSpecificPkmnDexEntry,
} from "../api/getPkmn";
import type { pkmnFromGen, pkmnWDex, pkmnWSprite } from "../types/pkmn";
import { NewGameBtns } from "../components/NewGameBtns";
import { Loading } from "../components/Loading";

export const Game = () => {
  const location = useLocation();
  const [correctPkmn, setCorrectPkmn] = useState<pkmnWSprite | pkmnWDex>();
  const [pkmnArr, setPkmnArr] = useState<(pkmnWSprite | pkmnWDex)[]>([]);
  const { gameCriteria } = location.state || {};
  const [reveal, setReveal] = useState(false);
  const [guess, setGuess] = useState("");
  const [newGame, setNewGame] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const pkmnGen =
    gameCriteria?.generation === "nat"
      ? "nat"
      : gameCriteria?.generation?.replace("gen", "");

  useEffect(() => {
    const getPkmnFromCorrectGen = async () => {
      setReveal(false);
      setGuess("");
      let lowest = 1;
      let highest = 1025;
      if (pkmnGen !== "nat") {
        const pkmnFromGen = await getPkmnFromGeneration(pkmnGen);
        const ids = pkmnFromGen
          .map((p: pkmnFromGen) => {
            const match = p.url.match(/pokemon-species\/(\d+)\//);
            return match ? Number(match[1]) : null;
          })
          .filter(Boolean);

        lowest = Math.min(...ids);
        highest = Math.max(...ids);
      }

      const randomNrArr: number[] = [];

      while (randomNrArr.length < 3) {
        const rand =
          Math.floor(Math.random() * (highest - lowest + 1)) + lowest;

        if (rand !== correctPkmn?.id && !randomNrArr.includes(rand)) {
          randomNrArr.push(rand);
        }
      }

      let p0: pkmnWDex | pkmnWSprite,
        p1: pkmnWDex | pkmnWSprite,
        p2: pkmnWDex | pkmnWSprite;

      if (gameCriteria.pkmnClue === "img") {
        [p0, p1, p2] = await Promise.all([
          getSpecificPkmn(randomNrArr[0], setIsLoading),
          getSpecificPkmn(randomNrArr[1], setIsLoading),
          getSpecificPkmn(randomNrArr[2], setIsLoading),
        ]);
      } else {
        [p0, p1, p2] = await Promise.all([
          getSpecificPkmnDexEntry(randomNrArr[0], setIsLoading),
          getSpecificPkmnDexEntry(randomNrArr[1], setIsLoading),
          getSpecificPkmnDexEntry(randomNrArr[2], setIsLoading),
        ]);
      }

      const correct = p1;
      setCorrectPkmn(correct);
      const answers = [p0, p1, p2];

      answers.sort(() => Math.random() - 0.5);

      setPkmnArr(answers);
      setNewGame(false);
    };
    if (newGame && !hasFetched.current) {
      hasFetched.current = true;
      getPkmnFromCorrectGen();
    }
  }, [pkmnGen, newGame]);
  const startNewGame = () => {
    setNewGame(true);
    hasFetched.current = false;
  };
  const handleGuess = (e: ChangeEvent<HTMLFormElement, Element>) => {
    setReveal(true);
    console.log(e.target.value);
    if (gameCriteria.pkmnAnswer === "multipleChoices") {
      if (correctPkmn && e.target.value === correctPkmn.pkmnName) {
        setGuess("correct");
      } else {
        setGuess("wrong");
      }
    } else {
      console.log(e.target.value);
    }
  };
  // console.log("guess", guess, "pkmnArr", pkmnArr, "correctPkmn", correctPkmn);
  return (
    <>
      <div id="game-header">
        <h1>Who's that Pkmn?</h1>
        {guess === "correct" && correctPkmn && (
          <h2 className="guess-header">
            <span id="correct">Correct!</span>
            <br /> It is{" "}
            {correctPkmn.pkmnName.charAt(0).toUpperCase() +
              correctPkmn.pkmnName.slice(1)}
            !
          </h2>
        )}
        {guess === "wrong" && correctPkmn && (
          <h2 className="guess-header">
            <span id="wrong">Wrong!</span>
            <br /> It is{" "}
            {correctPkmn.pkmnName.charAt(0).toUpperCase() +
              correctPkmn.pkmnName.slice(1)}
            !
          </h2>
        )}
      </div>
      {isLoading && <Loading />}
      {!isLoading && pkmnArr.length !== 0 && correctPkmn !== undefined && (
        <>
          <PkmnClue
            typeOfClue={gameCriteria.pkmnClue}
            pkmn={correctPkmn}
            reveal={reveal}
          />
          {guess === "" ? (
            <PkmnGuessInput
              typeOfAnswer={gameCriteria.pkmnAnswer}
              pkmnArr={pkmnArr}
              handleGuess={(e) => handleGuess(e)}
            />
          ) : (
            <NewGameBtns startNewGame={() => startNewGame()} />
          )}
        </>
      )}
    </>
  );
};
