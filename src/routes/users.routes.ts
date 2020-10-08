import { Router } from 'express';
import multer from 'multer';
import UserMap from '../map/UserMap';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import UpdateAvatarUserService from '../services/UpdateAvatarUserService';

const usersRouter = Router();
const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const updateAvatarUserService = new UpdateAvatarUserService();

      const user = await updateAvatarUserService.execute({
        user_id: request.user.id,
        filename: request.file.filename,
      });
      return response.json(UserMap.toDTO(user));
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);
export default usersRouter;
