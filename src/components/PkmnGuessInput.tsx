import type { ChangeEvent } from "react";
import type { pkmnData, pkmnWInfo } from "../types/pkmn";

interface IPkmnGuessProps {
  typeOfAnswer: string | undefined;
  alternatives: (pkmnWInfo | pkmnData)[];
  handleGuess: (e: ChangeEvent<HTMLFormElement, Element>) => void;
}

export const PkmnGuessInput = ({
  typeOfAnswer,
  alternatives,
  handleGuess,
}: IPkmnGuessProps) => {
  return (
    <>
      {typeOfAnswer === "multiple" ? (
        <form id="pkmn-guess-form" onChange={(e) => handleGuess(e)}>
          {alternatives.map((p: pkmnWInfo | pkmnData) => (
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
