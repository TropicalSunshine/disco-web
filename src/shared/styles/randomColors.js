/**
 * @param {string} str - a string
 * @return { string } - a color variable theme in css format
 */

export const randomColorFromString = (str) => {

    const colors = [
        "var(--red)",
        "var(--yellow)",
        "var(--purple)",
        "var(--green)",
        "var(--pink)"
    ]
    

    return colors[str.length % colors.length];
}