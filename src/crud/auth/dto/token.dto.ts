import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from 'src/crud/user/dto/user.type';

export class JWTTokenDto {
  @ApiResponseProperty()
  accessToken: string;

  @ApiResponseProperty()
  refreshToken: string;

  @ApiResponseProperty()
  user: User;
}
