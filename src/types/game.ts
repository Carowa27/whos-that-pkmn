import type { pkmnWInfo, pkmnData } from "./pkmn";

export interface GameState {
  alternatives: (pkmnWInfo | pkmnData)[];
  correct: pkmnWInfo | pkmnData | null;
  guess: "wrong" | "correct" | "";
  reveal: boolean;
}
