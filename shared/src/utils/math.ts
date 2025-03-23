/**
 * Gaussian bell curve for Math.random().
 * @param stdev Standard deviation of the function. Default is 1.
 * @param mean Mean of the function. Default is 0.
 * @link https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
 */
export function randomNormal (stdev = 1, mean = 0): number {
    const u = 1 - Math.random(); // Converting [0,1) to (0, 1].
    const v = Math.random();

    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    // Transform to desired mean and standard deviation:
    return (z * stdev) + mean;
}

/**
 * Chooses a random integer between min (inclusive) and max (inclusive).
 * @param min The minimum (inclusive) number to choose.
 * @param max The maximum (inclusive) number to choose.
 */
export function randInt (min: number, max: number) {
    return Math.floor(Math.random() * (max + 1)) + min;
}
