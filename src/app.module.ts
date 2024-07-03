import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaModule } from 'prisma/prisma.module';
import { UserModule } from './users/users.module';
import { UserService } from './users/users.service';
import { UserController } from './users/users.controller';

@Module({
  imports: [PrismaModule, UserModule],
  exports: [PrismaService, UserService],
  providers: [AppService, UserService, PrismaService],
  controllers: [AppController, UserController],
})
export class AppModule {}