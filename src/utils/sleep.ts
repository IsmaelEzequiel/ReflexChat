// ONLY FOR SIMULATE A REAL REQUEST DELAY
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}