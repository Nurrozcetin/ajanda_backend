import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { PasswordService } from '../auth/services/password.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
