import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';
import User from '../models/user';
import uploadConfig from '../config/upload';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateAvatarUserService {
  public async execute({ user_id, filename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new Error('Only user authenticated can alter Avatar');
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = filename;
    await userRepository.save(user);

    return user;
  }
}

export default UpdateAvatarUserService;
