import { Router } from 'express';
import UserMap from '../map/UserMap';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;
  try {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    return response.json(UserMap.toDTO(user));
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default usersRouter;
