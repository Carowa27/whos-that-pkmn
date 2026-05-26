import type { pkmnData } from "./pkmn";

export interface GameState {
  alternatives: pkmnData[];
  correct: pkmnData | null;
  guess: "wrong" | "correct" | "";
  reveal: boolean;
}
