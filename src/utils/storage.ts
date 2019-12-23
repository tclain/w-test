export const setItem = (key: string, value) => {
    window.localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key: string) => {
    return JSON.parse(window.localStorage.getItem(key))
}
