import express, { Request, Response } from 'express';
import { requireAuth, requireRole } from '../middleware/authMiddleware';
import {
  createClassroom,
  addUserToClassroom,
  sendMessage,
  shareFile,
  getClassroomMessages
} from '../controllers/classroomController';

const router = express.Router();

// Define the routes with authentication and role checks where necessary
router.post('/create', requireAuth, createClassroom);
router.post('/:classroomId/addUser', requireAuth, addUserToClassroom);
router.post('/:classroomId/message', requireAuth, sendMessage);
router.post('/:classroomId/shareFile', requireAuth, shareFile);
router.get('/:classroomId/messages', requireAuth, getClassroomMessages);
// router.get('/:classroomId/files', requireAuth, getClassroomFiles);

export default router;
