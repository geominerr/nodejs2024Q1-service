import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  artistId: any;

  @IsNotEmpty()
  @IsOptional()
  albumId: any;

  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
