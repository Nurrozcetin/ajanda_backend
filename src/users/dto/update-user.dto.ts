export class UpdateUserDto{
    userId: number;
    email: string;
    password: string;
    name: string;
    age: number;
}

/*
import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
*/