import request from 'supertest';

import app from '../../app';

import * as userService from '../../services/users.service'

// Mock the getUsers service function
jest.spyOn(userService, 'getUsers').mockImplementation(async () => userService.users);

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
