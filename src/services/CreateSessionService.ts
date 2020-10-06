import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/user';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);
    const messageIncorrectCombination = 'Incorrect combination password/email';
    const user = await userRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error(messageIncorrectCombination);
    }

    const passwordCorrect = await compare(password, user.password);

    if (!passwordCorrect) {
      throw new Error(messageIncorrectCombination);
    }
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ user_name: user.name }, secret, {
      subject: user.id,
      expiresIn,
    });
    return { user, token };
  }
}
export default CreateSessionService;
