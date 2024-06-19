import express from 'express';
import { User, Location, EventType } from '../interfaces/Users';
import { getUsers, registerUser, searchUsers } from '../services/users.service';

type UsersResponse = User[];

const router = express.Router();

/**
 * Return all users in disk/DB
 */
router.get<{}, UsersResponse>('/', async (req, res, next) => {
    try {
        let users = []
        users = await getUsers()

        res.json(users);
    } catch (error) {
        next(error)
    }
});

/**
 * Search for a user based on location and eventType
 */
router.get<{ location: Location, eventType: EventType }, UsersResponse>('/search/:location/:eventType', async (req, res, next) => {
    try {
        let users = []
        const { location, eventType } = req.params;
        users = await searchUsers({ location, eventType })

        res.json(users);
    } catch (error) {
        next(error)
    }
});

router.post<{}, User>('/register', async (req, res, next) => {
    try {
        const regUser = await registerUser(req.body);
        res.json(regUser)
    } catch (error) {
        // handle error in middleware
        next(error)
    }
})

export default router;