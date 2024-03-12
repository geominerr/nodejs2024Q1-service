import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440003',
  })
  id: string;

  @ApiProperty({ description: 'Album name', example: 'The Last Resort' })
  name: string;

  @ApiProperty({ description: 'Year of release', example: 2004 })
  year: number;

  @ApiProperty({
    description: 'UUID v4 [Ref to Artist]',
    example: '550e8400-e29b-41d4-a716-446655440001',
    nullable: true,
  })
  artistId: string | null;
}
