import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'dotenv';

import { AppModule } from './app.module';
import { setupSwagger } from './swagger/swagger.setup';

config();

async function bootstrap() {
  const port = process.env.PORT || 4000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(port);
}

bootstrap();
