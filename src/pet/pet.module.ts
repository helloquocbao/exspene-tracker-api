// src/pet/pet.module.ts
import { Module } from '@nestjs/common';
import { PetService } from './pet.service';
import { PetController } from './pet.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PetController],
  providers: [PetService],
  exports: [PetService], // nếu cần dùng ở module khác
})
export class PetModule {}
