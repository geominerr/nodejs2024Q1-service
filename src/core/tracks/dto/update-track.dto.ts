import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateTrackDto {
  @ApiProperty({ example: 'Genkai' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ example: 'UUID or null' })
  @IsOptional()
  artistId: string | null;

  @ApiPropertyOptional({ example: 'UUID or null' })
  @IsOptional()
  albumId: string | null;

  @ApiProperty({ example: 777 })
  @IsNumber()
  duration: number;
}
