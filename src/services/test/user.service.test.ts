import { getUsers, registerUser, searchUsers } from "../users.service"; // Import the function to be tested
import { NewUser, User } from "../../interfaces/Users";

// Define mock data for testing
const mockUsers: User[] = [
    { id: 1, name: 'Charlie', location: 'NYC', rates: 500, eventTypes: ['Wedding'], createdAt: new Date(), updatedAt: new Date() },
    { id: 2, name: 'Dana', location: 'LA', rates: 1500, eventTypes: ['Corporate'], createdAt: new Date(), updatedAt: new Date() },
];

describe('User service', () => {
    beforeAll(() => {
        // Setting up the users mock before all tests
        const usersModule = require('../users.service');
        usersModule.users = mockUsers;
    });

    it('gets users from database/memory', async () => {
        const users = await getUsers();
        expect(users).toEqual(mockUsers);
    });

    it('searches for users by location and event type', async () => {
        const users = await searchUsers({location: 'LA', eventType: 'Corporate'})
        expect(users).toEqual([mockUsers[1]])
    })

    it('registers new user and returns it', async () => {
        const newUser: NewUser = {
            name: 'Juan',
            location: 'Chicago',
            rates: 800,
            eventTypes: ['Club', 'Corporate']
        }

        const regUser = await registerUser(newUser)

        expect(regUser.id).toEqual(3)
        expect(regUser.createdAt).toEqual(expect.any(Date))
        expect(regUser.updatedAt).toEqual(expect.any(Date))
        expect(regUser.name).toEqual(newUser.name)
        expect(regUser.rates).toEqual(newUser.rates)
    })
});
