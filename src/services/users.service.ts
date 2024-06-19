import { User } from "../interfaces/Users";

// This data would be written in the database
export const users: User[] = [
    { id: 1, name: 'Alice', location: 'NYC', rates: 500, eventTypes: ['Wedding'], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Bob', location: 'LA', rates: 1000, eventTypes: ['Club'], createdAt: new Date(), updatedAt: new Date() },
];

/**
 * 
 * @returns list of registered users from DB/Disk
 */
export const getUsers = async (): Promise<User[]> => {
    // Here we would normally fetch from the database - hence async
    return users;
};