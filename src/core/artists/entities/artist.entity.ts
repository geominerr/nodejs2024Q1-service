import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  id: string;

  @ApiProperty({ description: 'Artist name', example: 'Anders Trentemoller' })
  name: string;

  @ApiProperty({ description: 'Has Grammy award', example: true })
  grammy: boolean;
}
