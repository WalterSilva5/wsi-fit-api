import { ApiResponseProperty } from '@nestjs/swagger';
// import * as swagger from '@nestjs/swagger';
// import * as classValidator from 'class-validator';

export class CliModDTO {
  @ApiResponseProperty()
  id?: number;
 
  //TODO: ADD REQUIRED FIELDS
  @ApiResponseProperty()
  createdAt?: Date;

  @ApiResponseProperty()
  updatedAt?: Date | null;

  @ApiResponseProperty()
  deletedAt?: Date | null;
}
