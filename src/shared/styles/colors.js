/**
 * @param {string} str - a string
 * @return { string } - a color variable theme in css format
 */

const colors = [
    "var(--red)",
    "var(--yellow)",
    "var(--purple)",
    "var(--green)"
]

export const randomColorFromString = (str) => {
    if (!str) return "";
    return colors[str.length % colors.length];
}

export const convertStringToColor = (str) => {
    if (!str) return "";
    return colors[str.length % colors.length];
}