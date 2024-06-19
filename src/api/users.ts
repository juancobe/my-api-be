import express from 'express';
import { User, Location, EventType } from '../interfaces/Users';
import { getUsers } from '../services/users.service';

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

export default router;