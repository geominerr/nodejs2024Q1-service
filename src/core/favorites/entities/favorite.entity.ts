import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';

import { Album } from '../../albums/entities/album.entity';
import { Artist } from '../../artists/entities/artist.entity';
import { Track } from '../../tracks/entities/track.entity';

export class Favorites {
  @ApiProperty({ type: [Artist] })
  artists: Artist[];

  @ApiProperty({ type: [Album] })
  albums: Album[];

  @ApiProperty({ type: [Track] })
  tracks: Track[];
}

export class TypeParamDto {
  @IsIn(['track', 'album', 'artist'])
  type: string;
}

export type FavoriteEntityType = 'track' | 'artist' | 'album';
