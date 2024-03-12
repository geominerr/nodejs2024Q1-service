import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateAlbumDto {
  @ApiProperty({ example: 'The Last Resort' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2004 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiPropertyOptional({
    example: 'a1f53145-61a0-4afa-85e8-7e074569d0a3',
    nullable: true,
  })
  artistId: string | null;
}
