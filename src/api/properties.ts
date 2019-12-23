import { database } from './database'
import { delay } from '../utils/time'

export const getPropertiesForUser = async (userId: string) => {
    await delay(800)
    return Object.values(database.properties).filter(
        property => property.user === userId
    )
}
