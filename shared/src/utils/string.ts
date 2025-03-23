/**
 * Format a number into a condensed form.
 * @param num The number to format.
 */
export const numToPredicateFormat = (num: number): string =>
    Math.abs(Number(num)) >= 1e21
        ? `${(Math.abs(Number(num)) / 1e21).toFixed(2)}S`
        : Math.abs(Number(num)) >= 1e18
            ? `${(Math.abs(Number(num)) / 1e18).toFixed(2)}QT`
            : Math.abs(Number(num)) >= 1e15
                ? `${(Math.abs(Number(num)) / 1e15).toFixed(2)}Q`
                : Math.abs(Number(num)) >= 1e12
                    ? `${(Math.abs(Number(num)) / 1e12).toFixed(2)}T`
                    : Math.abs(Number(num)) >= 1e9
                        ? `${(Math.abs(Number(num)) / 1e9).toFixed(2)}B`
                        : Math.abs(Number(num)) >= 1e6
                            ? `${(Math.abs(Number(num)) / 1e6).toFixed(2)}M`
                            : Math.abs(Number(num)) >= 1e3
                                ? `${(Math.abs(Number(num)) / 1e3).toFixed(2)}K`
                                : Math.abs(Number(num)).toString();

/**
 * Convert a number to duration form.
 * @param num The number.
 */
export const numToDurationFormat = (num: number): string => {
    const seconds = (Math.trunc(num / 1e3) % 60).toString().padStart(2, "0");
    const minutes = (Math.trunc(num / 6e4) % 60).toString().padStart(2, "0");
    const hours = Math.trunc(num / 36e5);
    return num > 1e12
        ? "Infinite"
        : hours > 0
            ? `${hours}:${minutes}:${seconds}`
            : `${minutes}:${seconds}`;
};

/**
 * Capitalize a string
 * @param str The string to capitalize.
 */
export const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);
