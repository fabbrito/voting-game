export const getRandom = (maxValue: number, skipValue?: number): number => {
  const pokemonId = Math.floor(Math.random() * maxValue) + 1;

  if (pokemonId !== skipValue) return pokemonId;
  return getRandom(maxValue, skipValue);
};

const getOptionsForVote = (maxValue: number) => {
  const firstId = getRandom(maxValue);
  const secondId = getRandom(maxValue, firstId);

  return [firstId, secondId];
};

export default getOptionsForVote;
