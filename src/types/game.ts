import type { pkmn } from "./pkmn";

export interface GameState {
  alternatives: pkmn[];
  correct: pkmn | null;
  guess: "wrong" | "correct" | "";
  reveal: boolean;
}
