import type { pkmnWDex, pkmnWSprite } from "./pkmn";

export interface GameState {
  alternatives: (pkmnWSprite | pkmnWDex)[];
  correct: pkmnWSprite | pkmnWDex;
  guess: "wrong" | "correct" | "";
  reveal: boolean;
}
