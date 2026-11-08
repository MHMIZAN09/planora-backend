import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { UsersModule } from '../users/users.module.js';
import { PrismaModule } from '../../prisma/prisma.module.js';
import { PasswordHasher } from '@nestjs/authentication';

@Module({
  controllers: [AuthController],
  providers: [AuthService,PasswordHasher],
  exports: [AuthService],
  imports: [PrismaModule, UsersModule],
})
export class AuthModule {}
