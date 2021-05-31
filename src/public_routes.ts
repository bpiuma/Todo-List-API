
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import * as actions from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(actions.createUser));
router.get('/todos', safe(actions.getTodosAll));
router.get('/todos/user/:userId', safe(actions.getTodos));
router.post('/todos/user/:userId', safe(actions.createTodos));
router.put('/todos/user/:userId', safe(actions.putTodos));
router.delete('/todos/user/:userId', safe(actions.deleteUser));


export default router;
