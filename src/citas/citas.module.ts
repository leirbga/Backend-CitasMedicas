import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CitasService } from './citas.service.js';
import { CitasController } from './citas.controller.js';
import { Citas, CitasSchema } from './schema/cita.schema.js';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Citas.name, schema: CitasSchema },
    ]),
  ],
  controllers: [CitasController],
  providers: [CitasService],
})
export class CitasModule {}