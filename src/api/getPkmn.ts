import { apiClient } from "./axiosConfig";

// get specific pkmn
// https://pokeapi.co/api/v2/pokemon/{id}

// get pkmn by gen
//https://pokeapi.co/api/v2/generation/2

export const getSpecificPkmn = async (id: number) => {
  try {
    const response = await apiClient.get(`/pokemon/${id}`);
    const pkmn = {
      id: response.data.id,
      pkmnName: response.data.name,
      dexEntries: null,
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

export const getSpecificPkmnDexEntry = async (id: number) => {
  try {
    const response = await apiClient.get(`/pokemon-species/${id}`);
    const pkmn = {
      id: response.data.id,
      pkmnName: response.data.name,
      dexEntries: response.data.flavor_text_entries,
      sprites: null,
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

export const getGenerations = async () => {
  try {
    const response = await apiClient.get(`/generation/`);
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
};
export const getGenerationData = async (gen: number) => {
  try {
    const response = await apiClient.get(`/generation/${gen}`);
    return response.data.main_region.name;
  } catch (error) {
    throw new Error(
      `Failed to fetch posts: ${error instanceof Error ? error.message : String(error)}`,
      { cause: error },
    );
  }
};
