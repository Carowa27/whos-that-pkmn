import type { pkmn } from "../types/pkmn";

interface IPkmnGuessProps {
  typeOfAnswer: "multipleChoices" | "textInput";
  pkmnArr: pkmn[];
}

export const PkmnGuessInput = ({ typeOfAnswer, pkmnArr }: IPkmnGuessProps) => {
  // console.log(typeOfAnswer, pkmnArr);

  return (
    <>
      <h4>PkmnGuessInput</h4>
      {typeOfAnswer === "multipleChoices" ? (
        <form>
          {pkmnArr.map((p) => (
            <label key={p.pkmnName}>
              <input type="radio" name="pokemon" value={p.pkmnName} />
              {p.pkmnName}
            </label>
          ))}
        </form>
      ) : (
        <p>textInput</p>
      )}
    </>
  );
};
