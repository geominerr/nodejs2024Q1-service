import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service';

import { IJwtConfig } from './models/auth.model';
import { AuthDto } from './dto/auth.dto';
import { RefreshDto } from './dto/refresh.dto';

@Injectable()
export class AuthService {
  jwtConfig: IJwtConfig;

  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
    private readonly db: DatabaseService,
  ) {
    this.jwtConfig = this.config.get<IJwtConfig>('jwt');
  }

  async signup(authDto: AuthDto) {
    const { login, password } = authDto;
    const hash = await bcrypt.hash(password, this.jwtConfig.cryptSalt);
    const user = await this.db.createUser({ login, password: hash });

    return { id: user.id };
  }

  async login(authDto: AuthDto) {
    const user = await this.db.getUserByLogin(authDto.login);

    if (!user) {
      throw new ForbiddenException();
    }

    const isMatch = await bcrypt.compare(authDto.password, user.password);

    if (!isMatch) {
      throw new ForbiddenException();
    }

    const tokens = await this.getTokens(user.id, user.login);

    return tokens;
  }

  async refresh(refreshDto: RefreshDto) {
    try {
      const { userId, login } = await this.jwt.verifyAsync(
        refreshDto.refreshToken,
        {
          secret: this.jwtConfig.jwtSecretRefreshKey,
          ignoreExpiration: false,
        },
      );

      const tokens = await this.getTokens(userId, login);

      return tokens;
    } catch {
      throw new ForbiddenException();
    }
  }

  private async getTokens(userId: string, login: string) {
    const {
      jwtSecretKey,
      tokenExpireTime,
      jwtSecretRefreshKey,
      tokenRefreshExpireTime,
    } = this.jwtConfig;

    const paylod = { userId, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(paylod, {
        expiresIn: tokenExpireTime,
        secret: jwtSecretKey,
      }),
      this.jwt.signAsync(paylod, {
        expiresIn: tokenRefreshExpireTime,
        secret: jwtSecretRefreshKey,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
