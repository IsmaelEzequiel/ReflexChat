// ONLY FOR SIMULATE A REAL REQUEST DELAY
export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}