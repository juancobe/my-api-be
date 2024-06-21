import request from 'supertest'

import app from '../../app'

import * as userService from '../../services/users.service'
import { NewUser } from '../../interfaces/Users'

import * as middlewares from '../../middlewares'
import { IGetUserAuthInfoRequest } from '../../interfaces/Auth'
import { NextFunction } from 'express'


// Mock the getUsers service function
jest.spyOn(userService, 'getUsers').mockImplementation(async () => userService.users);

// mock the middleware for authentication
(middlewares.authenticateJWT as jest.Mock) = jest.fn().mockImplementation(() => (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
    req.userAccount = { id: 1, username: 'testuser' }; // Mock user data
    next();
});

describe('POST /api/v1/users/register', () => {
    it('registers new user and returns a json message with the user', async () => {
        // Mock the registerUser service function
        const spy = jest.spyOn(userService, 'registerUser').mockImplementation(async (newUser: NewUser) => ({
            ...newUser,
            id: 3,
            updatedAt: new Date(),
            createdAt: new Date()
        }));

        const newUser: NewUser = {
            name: 'Juan',
            rates: 900,
            location: "NYC",
            eventTypes: ['Wedding']
        }

        const response = await request(app).post('/api/v1/users/register').send(newUser)
        expect(response.status).toBe(200);
        expect(response.headers["content-type"]).toMatch(/json/);
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('createdAt');
        expect(response.body).toHaveProperty('updatedAt');
        expect(response.body.name).toBe(newUser.name);

        spy.mockRestore()
    })

    it('fails to register new user if missing properties', async () => {
        const newUser = {
            name: 'Juan',
            rates: 900,
            location: "NYC"
        }

        const response = await request(app).post('/api/v1/users/register').send(newUser)
        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Missing required fields')
    })
})

describe('GET /api/v1/users/search', () => {
    it('searches for users when params are present', async () => {
        const response = await request(app).get('/api/v1/users/search/NYC/Wedding')
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body.length).toEqual(1)
    })

    it('fails search for users when params are missing', async () => {
        const response = await request(app).get('/api/v1/users/search/NYC')
        expect(response.status).toBe(404);
    })
})

describe('GET /api/v1/users', () => {
    it('responds with all users', async () => {
        const response = await request(app).get('/api/v1/users')
        expect(response.status).toBe(200)
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body.length).toEqual(2)

        // Deep compare the response
        expect(response.body).toEqual([
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                location: expect.any(String),
                rates: expect.any(Number),
                eventTypes: expect.arrayContaining([expect.any(String)]),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }),
            expect.objectContaining({
                id: expect.any(Number),
                name: expect.any(String),
                location: expect.any(String),
                rates: expect.any(Number),
                eventTypes: expect.arrayContaining([expect.any(String)]),
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
            }),
        ])
    });
});
