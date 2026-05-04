import type { ChangeEvent } from "react";
import type { pkmnWSprite, pkmnWDex } from "../types/pkmn";

interface IPkmnGuessProps {
  typeOfAnswer: "multipleChoices" | "textInput";
  pkmnArr: (pkmnWSprite | pkmnWDex)[];
  handleGuess: (e: ChangeEvent<HTMLFormElement, Element>) => void;
}

export const PkmnGuessInput = ({
  typeOfAnswer,
  pkmnArr,
  handleGuess,
}: IPkmnGuessProps) => {
  return (
    <>
      {typeOfAnswer === "multipleChoices" ? (
        <form id="pkmn-guess-form" onChange={(e) => handleGuess(e)}>
          {pkmnArr.map((p: pkmnWDex | pkmnWSprite) => (
            <label key={p.pkmnName} htmlFor={p.pkmnName} className="button">
              <input
                type="radio"
                name="pokemon"
                value={p.pkmnName}
                id={p.pkmnName}
              />
              {p.pkmnName.charAt(0).toUpperCase() + p.pkmnName.slice(1)}
            </label>
          ))}
        </form>
      ) : (
        <form id="pkmn-guess-form" onChange={(e) => handleGuess(e)}>
          <input
            type="text"
            name="pkmn-guess-text-input"
            id="pkmn-guess-text-input"
          />
        </form>
      )}
    </>
  );
};
