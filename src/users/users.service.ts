import { ConsoleLogger, Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordService } from 'src/auth/services/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(()=>PasswordService))
    private passwordService: PasswordService,
  ) {}

  async createUser(data: CreateUserDto ) {
    const encryptedPass = await this.passwordService.hashPassword(
      data.password,
    );
    const {password, ...user} = await this.prisma.user.create({
      data: {
        ...data,
        password: encryptedPass,
        date: {
          create: data.date?.map(date => ({ now: date.now })) || [],
        },
        answers: {
          create: data.answers?.map(answer => ({
            text: answer.text,
            questionId: answer.questionId,
          })) || [],
        },
      },
      include: {
        date: true,
        answers: true,
      },
    });
    return user;
  }

  async findUserByEmail(email:string) {
    const user = await this.prisma.user.findUnique({
      where: {email},
    });
    if(!user){
      throw new NotFoundException();
    }
    return user;
  }

  async findOneUser(id:number){
    return this.prisma.user.findUnique({
      where:{id},
    })
  }

  async deleteUser(id:number){
    return this.prisma.user.delete({
      where:{id},
    })
  }
}
