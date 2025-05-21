/**
 * Sleep for a period of time
 *
 * @param delay time in ms
 * @returns a promise that resolves after the delay
 */

export const sleep = (delay: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delay));
