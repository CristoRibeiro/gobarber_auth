import { Router } from 'express';
import UserMap from '../map/UserMap';
import CreateSessionService from '../services/CreateSessionService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const createSessionService = new CreateSessionService();
  const { user, token } = await createSessionService.execute({
    email,
    password,
  });
  const userDTO = UserMap.toDTO(user);

  return response.json({ userDTO, token });
});

export default sessionsRouter;
