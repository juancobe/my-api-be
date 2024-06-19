import { User, NewUser, SearchUser } from "../interfaces/Users";

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

/**
 * 
 * @param searchUsers Location and EventType of the users to search for
 * @returns User[]
 */
export const searchUsers = async (searchUser: SearchUser) => {
    if ((!searchUser.location && searchUser.eventType) || (!searchUser.eventType && searchUser.location)) {
        throw new Error('Missing required fields');
    }

    // TODO: Add validation that params are the correct type

    const users = await getUsers()


    return users.filter((user) => user.location === searchUser.location && user.eventTypes.includes(searchUser.eventType))
}

/**
 * 
 * @param newUser NewUser to be registered
 * @returns User for the registered NewUser
 * @throws Error if validation for required fields fails
 */
export const registerUser = async (newUser: NewUser): Promise<User> => {
    // Example validation: ensure required fields are present
    if (!newUser.name || !newUser.location || !newUser.rates || !newUser.eventTypes) {
        throw new Error('Missing required fields');
    }

    // TODO: Validate that all params are of the correct types

    // Here we would add data into DB
    const id = users.length + 1
    const createdAt = new Date()
    const regUser = { id, ...newUser, createdAt, updatedAt: createdAt }
    users.push(regUser)
    return regUser
}