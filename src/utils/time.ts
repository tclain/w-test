/**
 * a promisified version of a delay in miliseconds
 * @param ms
 */
export const delay = (ms: number) =>
    new Promise(resolve => setTimeout(resolve, ms))
