import type { ChangeEvent } from "react";
import type { pkmnData } from "../types/pkmn";

interface IPkmnGuessProps {
  typeOfAnswer: string | undefined;
  alternatives: pkmnData[];
  handleGuess: (e: ChangeEvent<HTMLFormElement, Element>) => void;
}

export const PkmnGuessInput = ({
  typeOfAnswer,
  alternatives,
  handleGuess,
}: IPkmnGuessProps) => {
  return (
    <>
      {typeOfAnswer === "multiple" && (
        <form id="pkmn-guess-form" onChange={(e) => handleGuess(e)}>
          {alternatives.map((p: pkmnData) => (
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
      )}
      {typeOfAnswer === "boolean" && (
        <form id="pkmn-guess-form" onChange={(e) => handleGuess(e)}>
          <label key={"shiny-true"} htmlFor={"shiny-true"} className="button">
            <input
              type="radio"
              name="shiny"
              value="shiny-true"
              id="shiny-true"
            />
            True
          </label>
          <label key={"shiny-false"} htmlFor={"shiny-false"} className="button">
            <input
              type="radio"
              name="shiny"
              value="shiny-false"
              id="shiny-false"
            />
            False
          </label>
        </form>
      )}
      {typeOfAnswer === "text" && (
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
