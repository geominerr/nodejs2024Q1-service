import { IsIn } from 'class-validator';

export class TypeParamDto {
  @IsIn(['track', 'album', 'artist'])
  type: string;
}

export type FavoriteEntityType = 'track' | 'artist' | 'album';
