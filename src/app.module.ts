import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { appConfig, jwtConfig, dbConfig } from './config/config';
import { JwtAuthGuard } from './auth/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [appConfig, jwtConfig, dbConfig] }),
    CoreModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
