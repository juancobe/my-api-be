import { getUsers } from "../users.service"; // Import the function to be tested
import { User } from "../../interfaces/Users";

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
});
