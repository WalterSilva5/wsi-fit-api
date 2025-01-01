import { User } from 'src/crud/user/dto/user.type';
import { Request } from 'express';

export interface AuthRequestDTO extends Request {
  user: User;
}
