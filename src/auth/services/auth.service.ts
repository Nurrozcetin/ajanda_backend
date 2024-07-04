import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IPayload } from "../constants/types";
import { PasswordService } from "./password.service";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private passwordService: PasswordService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        const comparePassword = await this.passwordService.compare(
            password,
            user.password,
        );
        if(user && comparePassword) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async login(user:any) {
        const payload: IPayload = {
            sub: user.id,
            email: user.email,
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.createUser(createUserDto);
        const payload: IPayload = {
          sub: user.id,
          email: user.email,
        };
        return {
          accessToken: this.jwtService.sign(payload),
        };
      }

    
}
