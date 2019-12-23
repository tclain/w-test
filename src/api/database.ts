import { Database, CollectionName, IndexableRecord, Entity, ID } from './types'
import { uniqId } from '../utils/uniq'
import { RecordNotFound } from './errors'

/**
 * fake api  simulating a backend
 */

// fake database to accomodate the needs of our demo
export const database: Database = {
    // for the sake of the demo, we index users by their email for easy and fast retrieval
    users: {
        'tclain@gmail.com': {
            id: '1',
            email: 'tclain@gmail.com',
            password: 'tclain',
        },
        'thierry@usewalter.com': {
            id: '1',
            email: 'thierry@usewalter.com',
            password: 'thierry',
        },
    },

    properties: {
        '1': {
            address: '3567 Rue Clark, H2S 3E5',
            city: 'Montreal',
            id: '1',
            name: 'Condos 1',
            user: 'tclain@gmail.com',
        },
        '2': {
            address: '1234 Rue Clark, H4S 375',
            city: 'Montreal',
            id: '1',
            name: 'Condos 2',
            user: 'thierry@usewalter.com',
        },
    },

    todos: {
        '1': {
            done: true,
            title: 'call thierry',
            user: '1',
            id: '1',
            property: '1',
        },
        '2': {
            done: true,
            title: 'eat some chocolate',
            user: '1',
            id: '2',
            property: '2',
        },
        '3': {
            done: false,
            title: 'eat some doughnuts',
            user: '1',
            id: '3',
            property: '2',
        },
    },
}

/**
 * utilities function to update the database for the sake of the example
 * @param collectionName
 * @param obj
 */

export function add<Record extends Entity>(collectionName: CollectionName) {
    return (obj: Record): Promise<Record> => {
        const id = obj.id || uniqId()
        database[collectionName][id] = { ...obj, id }
        return Promise.resolve(database[id])
    }
}

export function update<Record extends Entity>(collectionName: CollectionName) {
    return (obj: Partial<Record>): Promise<Record> => {
        const id = obj.id
        const existing = database[collectionName][id]
        if (!existing) throw new RecordNotFound()

        const newobject = { ...existing, ...obj, id }
        database[collectionName][id] = newobject

        return Promise.resolve(newobject as Record)
    }
}

export function remove(collectionName: CollectionName) {
    return (id: ID) => {
        if (!database[collectionName][id]) throw new RecordNotFound()
        delete database[collectionName][id]

        return Promise.resolve(true)
    }
}
