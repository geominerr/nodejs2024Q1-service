import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'old_password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  oldPassword: string;

  @ApiProperty({ example: 'new_password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  newPassword: string;
}
