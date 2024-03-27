import { ApiProperty } from '@nestjs/swagger';

export class Tokens {
  @ApiProperty({
    description: 'Access token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkiLCJ1c2VybmFtZSI6ImpvaG5fZG9lIiwiaWF0IjoxNjE4NDM0MzIyLCJleHAiOjE2MTg0MzU5MjJ9.B7HBYijEnG8B1kG1z1v4f0P5y8m41B3W6V2B-r6l3gY',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjM0NTY3ODkiLCJleHAiOjE2MTkxMzkyNzQsImlhdCI6MTYxODQzNDMyMn0.mhqjFwjez5lZQWlElLJqB5mCetqS6LZ5VWXZduBiN8Y',
  })
  refreshToken: string;
}
