import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient, User } from '@prisma/client';
import { createUser } from '../controllers/user';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Define the Signup function
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, role }: { name: string; email: string; password: string; role: string } = req.body;

  try {
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new user
    const user = await createUser({ name, email, password: hashedPassword, role });

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET as string);

    // Send response
    res.status(201).json({ token, user });
  } catch (error) {
    res.status(500).json({
      message: 'Error in signing up the User',
      details: error.message,
    });
  }
};

// Define the Login function
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;

  try {
    // Retrieve the user by email
    const userByEmail = await getUser({ email });

    // Validate the password
    if (userByEmail && (await bcrypt.compare(password, userByEmail.password))) {
      // Generate a JWT token
      const token = jwt.sign({ userId: userByEmail.id, role: userByEmail.role }, process.env.JWT_SECRET as string);

      // Send response
      res.json({ token, userByEmail });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error in logging in the User',
      details: error.message,
    });
  }
};

// Helper function to get user by email (you may want to implement this in another file)
const getUser = async ({ email }: { email: string }): Promise<User | null> => {
  try {
    return await prisma.user.findUnique({ where: { email } });
  } catch (error) {
    throw new Error('Error retrieving user');
  }
};
