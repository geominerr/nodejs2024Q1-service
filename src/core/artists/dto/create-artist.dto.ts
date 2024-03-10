import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ example: 'Anders Trentemoller' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
