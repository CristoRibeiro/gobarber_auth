import { Router } from 'express';
import UserMap from '../map/UserMap';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  try {
    const createSessionService = new CreateSessionService();
    const { user, token } = await createSessionService.execute({
      email,
      password,
    });
    const userDTO = UserMap.toDTO(user);

    return response.json({ userDTO, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
