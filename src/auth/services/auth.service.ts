import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";
import { IPayload } from "../constants/types";
import { PasswordService } from "./password.service";

@Injectable()
export class AuthService{
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private passwordService: PasswordService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findUserByEmail(email);
        const comparePassword = this.passwordService.compare(
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
        const payload:IPayload = {
            sub: user.id,
            email: user.email,
            password: user.password
        };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}        