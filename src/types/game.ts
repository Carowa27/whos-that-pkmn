import type { pkmn } from "./pkmn";

export interface GameState {
  alternatives: pkmn[];
  correct: pkmn;
  guess: "wrong" | "correct" | "";
  reveal: boolean;
}
