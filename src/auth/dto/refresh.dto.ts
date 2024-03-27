import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshDto {
  @ApiProperty({
    example:
      'Rea3f2c95b87e7f4d06f48f7b9a1f8e2e04bc4e0a79dc18351a29cb0a987261dfe',
  })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
