import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { PetModule } from './pet/pet.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    // Load biến môi trường từ .env và dùng toàn cục
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PetModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
