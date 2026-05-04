import { useLocation } from "react-router-dom";
import { PkmnClue } from "../components/PkmnClue";
import { PkmnGuessInput } from "../components/PkmnGuessInput";
import { useEffect, useRef, useState } from "react";
import { getPkmnFromGeneration, getSpecificPkmn } from "../api/getPkmn";
import type { pkmn } from "../types/pkmn";

export const Game = () => {
  const location = useLocation();
  const numbersRef = useRef(null);
  const [correctPkmn, setCorrectPkmn] = useState<pkmn>();
  const [pkmnArr, setPkmnArr] = useState<pkmn[]>([]);
  const { gameCriteria } = location.state || {};

  const pkmnGen =
    gameCriteria?.generation === "nat"
      ? "nat"
      : gameCriteria?.generation?.replace("gen", "");

  useEffect(() => {
    console.log("in useeffect");
    const getPkmnFromCorrectGen = async () => {
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
      if (!numbersRef.current && lowest != null && highest != null) {
        numbersRef.current = Array.from(
          { length: 3 },
          () => Math.floor(Math.random() * (highest - lowest + 1)) + lowest,
        );
      }
      const randomNrArr = numbersRef.current;

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
    };
    getPkmnFromCorrectGen();
  }, [pkmnGen]);

  return (
    <>
      <h2>Who's that Pkmn?</h2>
      {pkmnArr !== undefined && correctPkmn !== undefined && (
        <>
          <PkmnClue typeOfClue={gameCriteria.pkmnClue} pkmn={correctPkmn} />
          <PkmnGuessInput
            typeOfAnswer={gameCriteria.pkmnAnswer}
            pkmnArr={pkmnArr}
          />
        </>
      )}
    </>
  );
};
