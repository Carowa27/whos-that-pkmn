import { apiClient } from "./axiosConfig";

// get specific pkmn
// https://pokeapi.co/api/v2/pokemon/{id}

// get pkmn by gen
//https://pokeapi.co/api/v2/generation/2

export const getSpecificPkmn = async (id: number) => {
  try {
    const response = await apiClient.get(`/pokemon/${id}`);
    const pkmn = {
      id: response.data.order,
      pkmnName: response.data.name,
      sprites: response.data.sprites,
    };

    return pkmn;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
};

export const getPkmnFromGeneration = async (gen: number) => {
  try {
    const response = await apiClient.get(`/generation/${gen}`);
    return response.data.pokemon_species;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
};
