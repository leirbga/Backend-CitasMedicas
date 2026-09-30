import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  console.info('[bootstrap] Creating NestJS application');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );
  await app.listen(process.env.PORT ?? 3000);
  console.info('[bootstrap] NestJS application is listening');
}

try {
  await bootstrap();
} catch (error: unknown) {
  const details = error instanceof Error ? (error.stack ?? error.message) : String(error);
  console.error('[bootstrap] NestJS application failed to start', details);
  throw error;
}
