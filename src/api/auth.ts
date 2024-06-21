import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Account } from '../interfaces/Auth';

const authRouter = Router();

// Mock users for demonstration
const users: Account[] = [
    {
        id: 1,
        username: 'test',
        password: '$2a$10$dGqT7WbBKWZxT5ZNSMGnTughgpKcOWJNUximgQ6BcH52nShX5UCJC' // 'test' hashed
    }
];

authRouter.post('/register', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const existingAccount = users.find((u) => u.username === username);

    if (existingAccount) {
        res.status(409).json({ message: "User already exists" })
    }

    users.push({ id: users.length + 1, username, password: await bcrypt.hash(password, 10) })

    res.status(200).json({
        message: 'registration success'
    })
})

authRouter.post('/login', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: '1d',
        });

        res.json({
            message: 'Authentication successful!',
            token,
        });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
});

export default authRouter;
