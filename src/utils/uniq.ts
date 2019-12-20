/** most simplistic application-wide unique id generator */
let id = 0
export const uniqId = () => {
    id++
    return id
}
