import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from '../users/users.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() body: { email: string; password: string; name: string; yas?: number; dates?: { now: Date }[]; answers?: { text: string; questionId: number }[] }) {
    return this.userService.createUser(body);
  }

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() body: { email?: string; password?: string; name?: string; yas?: number; dates?: { now: Date }[]; answers?: { text: string; questionId: number }[] }) {
    return this.userService.updateUser(Number(id), body);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(Number(id));
  }
}
