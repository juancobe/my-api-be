export type EventType = "Wedding" | "Club" | "Corporate"

export type Location = "NYC" | "LA" | "Chicago"

export interface User {
    id: number,
    name: string,
    location: Location,
    rates: number,
    eventTypes: EventType[]
    createdAt: Date,
    updatedAt: Date
}

export interface NewUser extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {}

export interface SearchUser {
    location: Location,
    eventType: EventType
}