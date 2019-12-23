/**
 * Business types of the application.
 * Ideally it would come from autogeneration (open api, graphql schema)
 */
export type ID = string

export interface IndexableRecord {
    id?: ID
}

export type MapOf<Record, Key extends string | number | symbol = string> = {
    [key in Key]: Record
}

// entities --------------------------------

export interface User extends IndexableRecord {
    email: string
    password: string
}

export interface Todo extends IndexableRecord {
    title: string
    done: boolean
    user: ID | User
    property: ID | Property
}

export interface Property extends IndexableRecord {
    name: string
    address: string
    city: string
    user: ID | User
}

export type Database = {
    users: MapOf<User>
    properties: MapOf<Property>
    todos: MapOf<Todo>
}

export type CollectionName = keyof Database
export type Entity = Todo | User | Property
