import { Exclude } from 'class-transformer';

export class GetUserDto {
  id: string;

  login: string;

  @Exclude()
  password: string;

  version: number;

  createdAt: number;

  updatedAt: number;
}
