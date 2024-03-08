import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  oldPassword: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}
