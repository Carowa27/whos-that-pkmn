import { useLocation } from "react-router-dom";
import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { useEffect, useState } from "react";
import { getPkmnFromGeneration, getSpecificPkmn } from "../api/getPkmn";
import type { pkmn } from "../types/pkmn";
import { NewGameBtns } from "../components/NewGameBtns";

export const Game = () => {
  const location = useLocation();
  const [correctPkmn, setCorrectPkmn] = useState<pkmn>();
  const [pkmnArr, setPkmnArr] = useState<pkmn[]>([]);
  const { gameCriteria } = location.state || {};
  const [reveal, setReveal] = useState(false);
  const [guess, setGuess] = useState("");
  const [startNewGame, setStartNewGame] = useState(true);

  const pkmnGen =
    gameCriteria?.generation === "nat"
      ? "nat"
      : gameCriteria?.generation?.replace("gen", "");

  useEffect(() => {
    console.log("in useeffect");
    let randomNrArr = [];
    const getPkmnFromCorrectGen = async () => {
      setReveal(false);
      setGuess("");
      let lowest = 1;
      let highest = 1025;
      if (pkmnGen !== "nat") {
        const pkmnFromGen = await getPkmnFromGeneration(pkmnGen);
        const ids = pkmnFromGen.map((p) => {
          const match = p.url.match(/pokemon-species\/(\d+)\//);
          return Number(match[1]);
        });

        lowest = Math.min(...ids);
        highest = Math.max(...ids);
      }

      if (startNewGame === true) {
        randomNrArr = Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * (highest - lowest + 1)) + lowest,
        ).filter((id) => id !== correctPkmn?.id);
      }

      const [p0, p1, p2] = await Promise.all([
        getSpecificPkmn(randomNrArr[0]),
        getSpecificPkmn(randomNrArr[1]),
        getSpecificPkmn(randomNrArr[2]),
      ]);
      const correct = p1;
      setCorrectPkmn(correct);
      const answers = [p0, p1, p2];

      answers.sort(() => Math.random() - 0.5);

      setPkmnArr(answers);
      setStartNewGame(false);
    };
    console.log(randomNrArr);

    getPkmnFromCorrectGen();
  }, [pkmnGen, startNewGame]);

  const handleGuess = (e) => {
    setReveal(true);
    console.log(e.target.value);
    if (e.target.value === correctPkmn.pkmnName) {
      setGuess("correct");
    } else {
      setGuess("wrong");
    }
  };
  return (
    <>
      <h1>Who's that Pkmn?</h1>
      {guess === "correct" && (
        <h2>
          <span id="correct">Correct!</span> It is{" "}
          {correctPkmn.pkmnName.charAt(0).toUpperCase() +
            correctPkmn.pkmnName.slice(1)}
          !
        </h2>
      )}
      {guess === "wrong" && (
        <h2>
          <span id="wrong">Wrong!</span> It is{" "}
          {correctPkmn.pkmnName.charAt(0).toUpperCase() +
            correctPkmn.pkmnName.slice(1)}
          !
        </h2>
      )}
      {pkmnArr !== undefined && correctPkmn !== undefined && (
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
            <NewGameBtns startNewGame={() => setStartNewGame(true)} />
          )}
        </>
      )}
    </>
  );
};
