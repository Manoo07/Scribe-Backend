import express, { Request, Response } from 'express';
import { signup, login } from '../controllers/authController';
import { updateUser, getAllUsers, deleteUser } from '../controllers/userController';

const router = express.Router();

// Define the routes
router.post('/signup', signup);
router.get('/login', login);
router.put('/update/:id', updateUser);
router.get('/all', getAllUsers);
router.delete('/delete/:id', deleteUser);

export default router;
