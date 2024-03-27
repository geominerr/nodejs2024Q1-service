import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { Tokens } from './entities/tokens.entity';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({
    status: 400,
    description:
      'Invalid request: login or password are missing or not strings',
  })
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Tokens obtained successfully',
    type: Tokens,
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid request: login or password are missing or not strings',
  })
  @ApiResponse({ status: 403, description: 'Authentication failed' })
  login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh' })
  @ApiResponse({ status: 200, description: 'Tokens refreshed successfully' })
  @ApiResponse({
    status: 401,
    description: 'Invalid request: refreshToken is missing',
  })
  @ApiResponse({ status: 403, description: 'Authentication failed' })
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
