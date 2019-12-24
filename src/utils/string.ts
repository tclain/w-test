export const definedAndNotVoid = str =>
    !(str === null || str === undefined || str === '')

export const looksLikeAnEmail = (str: string) =>
    definedAndNotVoid(str) && str.includes('@')
