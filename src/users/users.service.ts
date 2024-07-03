import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: { email: string; password: string; name: string; yas?: number; dates?: { now: Date }[]; answers?: { text: string; questionId: number }[] }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        yas: data.yas,
        date: data.dates ? { create: data.dates } : undefined,
        answers: data.answers ? { create: data.answers } : undefined,
      },
      include: { date: true, answers: true },
    });
  }

  async getUsers() {
    return this.prisma.user.findMany({
      include: { date: true, answers: true },
    });
  }

  async getUserById(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: { date: true, answers: true },
    });
  }

  async updateUser(id: number, data: { email?: string; password?: string; name?: string; yas?: number; dates?: { now: Date }[]; answers?: { text: string; questionId: number }[] }) {
    return this.prisma.user.update({
      where: { id },
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        yas: data.yas,
        date: data.dates ? { create: data.dates } : undefined,
        answers: data.answers ? { create: data.answers } : undefined,
      },
      include: { date: true, answers: true },
    });
  }

  async deleteUser(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
