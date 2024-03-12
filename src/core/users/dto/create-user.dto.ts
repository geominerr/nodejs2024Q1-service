import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John_777' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'PaSsw0rd' })
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}
