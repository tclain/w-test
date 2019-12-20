/**
 * check if a specific error is of the given type
 */
export const errorIsOfType = (errorObject, Class): boolean =>
    errorObject instanceof Class
