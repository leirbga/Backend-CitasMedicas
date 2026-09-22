import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module.js';

const app = await NestFactory.createApplicationContext(AppModule);
await app.close();
console.log('Seed completado: médicos y pacientes disponibles.');
