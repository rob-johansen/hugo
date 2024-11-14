export const getRandomInt = (min: number, max: number) => {
  const minCeiled = Math.ceil(min);
  return Math.floor(Math.random() * (Math.floor(max) - minCeiled) + minCeiled);
}
