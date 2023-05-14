import {Router} from 'express';

import { getTasks, createTask, countTask, deleteTask, getTask, updateTask } from '../controllers/tasks.js';
const router = Router();

router.get('/tasks', getTasks);
router.get('/tasks/count', countTask);
router.get('/tasks/:id', getTask);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.delete('/tasks/:id', deleteTask);

//module.exports = router;
export default router;