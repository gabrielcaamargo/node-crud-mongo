import { Router } from 'express';
import UserController from './controllers/UserController';

const router = Router();

router.get('/users', UserController.listUsers);
router.post('/users', UserController.createUser);
router.delete('/users/:id', UserController.deleteUser);

export default router;