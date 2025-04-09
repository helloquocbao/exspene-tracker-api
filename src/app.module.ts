import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 👈 import ConfigModule
import { ExpensesModule } from './expenses/expenses.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // 👈 load .env, dùng toàn app
    ExpensesModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
