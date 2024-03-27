import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'John_777' })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({ example: 'PaSsw0rd' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
