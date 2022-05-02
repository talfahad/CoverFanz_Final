import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { json } from 'express';

// import helmet from 'helmet';
// import csurf from 'csurf';
// Check this cross ref helper later on

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule);

  // app.use(csurf());
  // app.use(helmet());

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true }));
  app.use(cookieParser());

  app.use(json({ limit: '15mb' }));

  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`Application listening on Port ${port}`);
}

bootstrap();
