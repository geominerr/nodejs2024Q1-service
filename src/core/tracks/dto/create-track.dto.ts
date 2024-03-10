import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ example: 'Prana' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'UUID or null' })
  @IsNotEmpty()
  @IsOptional()
  artistId: any;

  @ApiProperty({ example: 'UUID or null' })
  @IsNotEmpty()
  @IsOptional()
  albumId: any;

  @ApiProperty({ example: 1444 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
