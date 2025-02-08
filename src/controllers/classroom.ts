import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Classroom creation
export const createClassroom = async (req: Request, res: Response): Promise<void> => {
  const { name } = req.body;
  const createdById = req.user.userId;

  try {
    const classroom = await prisma.classroom.create({
      data: { name, createdById },
    });
    res.json({ classroom });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create classroom' });
  }
};

// Add a user to a classroom
export const addUserToClassroom = async (req: Request, res: Response): Promise<void> => {
  const { classroomId } = req.params;
  const { userId } = req.body;

  try {
    await prisma.classroom.update({
      where: { id: parseInt(classroomId) },
      data: { users: { connect: { id: userId } } },
    });
    res.json({ message: 'User added to classroom' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user to classroom' });
  }
};

// Send a message within a classroom
export const sendMessage = async (req: Request, res: Response): Promise<void> => {
  const { classroomId } = req.params;
  const { content } = req.body;
  const userId = req.user.userId;

  try {
    const message = await prisma.message.create({
      data: { content, userId, classroomId: parseInt(classroomId) },
    });
    res.json({ message });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Share a file within a classroom
export const shareFile = async (req: Request, res: Response): Promise<void> => {
  const { classroomId } = req.params;
  const { filename, url } = req.body;

  try {
    const file = await prisma.file.create({
      data: { filename, url, classroomId: parseInt(classroomId) },
    });
    res.json({ file });
  } catch (error) {
    res.status(500).json({ error: 'Failed to share file' });
  }
};

// Get all messages in a classroom
export const getClassroomMessages = async (req: Request, res: Response): Promise<void> => {
  const { classroomId } = req.params;

  try {
    const messages = await prisma.message.findMany({
      where: { classroomId: parseInt(classroomId) },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    res.json({ messages });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

// Get user details based on a filter
export const getUser = async (filter: { [key: string]: any }): Promise<any> => {
  try {
    const user = await prisma.user.findUnique({
      where: filter,
    });
    if (!user) throw new Error("User not found");
    return user;
  } catch (error) {
    throw new Error(`Error retrieving user: ${error.message}`);
  }
};
