import User from '../models/user';

export default class UserMap {
  public static toDTO(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      create_at: user.create_at,
      update_at: user.update_at,
      avatar: user.avatar,
    };
  }
}
