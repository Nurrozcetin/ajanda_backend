import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './users/users.controller';
import { UserService } from './users/users.service';

@Module({
  imports: [PrismaModule, UserModule, AuthModule],
  providers: [AppService, UserService],
  controllers: [AuthController, UserController],
})
export class AppModule {}
