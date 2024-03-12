import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class User {
  @ApiProperty({
    description: 'UUID v4',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({ example: 'john_doe' })
  login: string;

  @ApiHideProperty()
  @Exclude()
  password: string;

  @ApiProperty({
    description: 'Integer number, increments on update',
    example: 1,
    type: 'integer',
  })
  version: number;

  @ApiProperty({ description: 'Timestamp of creation', example: 1646880000 })
  createdAt: number;

  @ApiProperty({ description: 'Timestamp of last update', example: 1646881000 })
  updatedAt: number;
}
