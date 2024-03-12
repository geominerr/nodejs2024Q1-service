import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  id: string;

  @ApiProperty({ description: 'Track name', example: 'Hey Jude' })
  name: string;

  @ApiProperty({
    description: 'UUID v4 [Ref to Artist]',
    example: '550e8400-e29b-41d4-a716-446655440001',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'UUID v4 [Ref to Album]',
    example: '550e8400-e29b-41d4-a716-446655440003',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Duration in seconds',
    example: 300,
    type: 'integer',
  })
  duration: number;
}
