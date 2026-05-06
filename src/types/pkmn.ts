export interface pkmnFromGen {
  name: string;
  url: string;
}
export interface pkmn {
  id: number;
  pkmnName: string;
  dexEntries: FlavorTextEntry[];
  sprites: PokemonSprites;
}
interface FlavorTextEntry {
  flavor_text: string;

  language: {
    name: string;
    url: string;
  };

  version: {
    name: string;
    url: string;
  };
}

type Sprite = string | undefined;

interface PokemonSprites {
  back_default: Sprite;
  back_female: Sprite;
  back_shiny: Sprite;
  back_shiny_female: Sprite;
  front_default: Sprite;
  front_female: Sprite;
  front_shiny: Sprite;
  front_shiny_female: Sprite;

  other: {
    dream_world: {
      front_default: Sprite;
      front_female: Sprite;
    };
    home: {
      front_default: Sprite;
      front_female: Sprite;
      front_shiny: Sprite;
      front_shiny_female: Sprite;
    };
    "official-artwork": {
      front_default: Sprite;
      front_shiny: Sprite;
    };
    showdown: {
      back_default: Sprite;
      back_female: Sprite;
      back_shiny: Sprite;
      back_shiny_female: Sprite;
      front_default: Sprite;
      front_female: Sprite;
      front_shiny: Sprite;
      front_shiny_female: Sprite;
    };
  };

  versions: {
    "generation-i": {
      "red-blue": {
        back_default: Sprite;
        back_gray: Sprite;
        back_transparent: Sprite;
        front_default: Sprite;
        front_gray: Sprite;
        front_transparent: Sprite;
      };
      yellow: {
        back_default: Sprite;
        back_gray: Sprite;
        back_transparent: Sprite;
        front_default: Sprite;
        front_gray: Sprite;
        front_transparent: Sprite;
      };
    };

    "generation-ii": {
      crystal: {
        back_default: Sprite;
        back_shiny: Sprite;
        back_shiny_transparent: Sprite;
        back_transparent: Sprite;
        front_default: Sprite;
        front_shiny: Sprite;
        front_shiny_transparent: Sprite;
        front_transparent: Sprite;
      };
      gold: {
        back_default: Sprite;
        back_shiny: Sprite;
        front_default: Sprite;
        front_shiny: Sprite;
        front_transparent: Sprite;
      };
      silver: {
        back_default: Sprite;
        back_shiny: Sprite;
        front_default: Sprite;
        front_shiny: Sprite;
        front_transparent: Sprite;
      };
    };

    "generation-iii": {
      emerald: {
        front_default: Sprite;
        front_shiny: Sprite;
      };
      "firered-leafgreen": {
        back_default: Sprite;
        back_shiny: Sprite;
        front_default: Sprite;
        front_shiny: Sprite;
      };
      "ruby-sapphire": {
        back_default: Sprite;
        back_shiny: Sprite;
        front_default: Sprite;
        front_shiny: Sprite;
      };
    };

    "generation-iv": {
      "diamond-pearl": {
        back_default: Sprite;
        back_female: Sprite;
        back_shiny: Sprite;
        back_shiny_female: Sprite;
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
      "heartgold-soulsilver": {
        back_default: Sprite;
        back_female: Sprite;
        back_shiny: Sprite;
        back_shiny_female: Sprite;
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
      platinum: {
        back_default: Sprite;
        back_female: Sprite;
        back_shiny: Sprite;
        back_shiny_female: Sprite;
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
    };

    "generation-v": {
      "black-white": {
        animated: {
          back_default: Sprite;
          back_female: Sprite;
          back_shiny: Sprite;
          back_shiny_female: Sprite;
          front_default: Sprite;
          front_female: Sprite;
          front_shiny: Sprite;
          front_shiny_female: Sprite;
        };
        back_default: Sprite;
        back_female: Sprite;
        back_shiny: Sprite;
        back_shiny_female: Sprite;
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
    };

    "generation-vi": {
      "omegaruby-alphasapphire": {
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
      "x-y": {
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
    };

    "generation-vii": {
      icons: {
        front_default: Sprite;
        front_female: Sprite;
      };
      "ultra-sun-ultra-moon": {
        front_default: Sprite;
        front_female: Sprite;
        front_shiny: Sprite;
        front_shiny_female: Sprite;
      };
    };

    "generation-viii": {
      "brilliant-diamond-shining-pearl": {
        front_default: Sprite;
        front_female: Sprite;
      };
      icons: {
        front_default: Sprite;
        front_female: Sprite;
      };
    };

    "generation-ix": {
      "scarlet-violet": {
        front_default: Sprite;
        front_female: Sprite;
      };
    };
  };
}
