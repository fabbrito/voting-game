const MAX_POKEDEX_ID = 493;

export const getRandomPokemon = (notThisOne?: number): number => {
  const pokemonId = Math.floor(Math.random() * MAX_POKEDEX_ID) + 1;

  if (pokemonId !== notThisOne) return pokemonId;
  return getRandomPokemon(notThisOne);
};

export const getOptionsForVote = () => {
  const firstId = getRandomPokemon();
  const secondId = getRandomPokemon(firstId);

  return [firstId, secondId];
};
