export const ifFalsy = (operation, result) => (...args) =>
    !operation(...args) ? result : null
