import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequestDTO } from 'src/crud/auth/dto/auth-request.dto';
import { User } from 'src/crud/user/dto/user.type';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequestDTO>();
    return request.user;
  },
);