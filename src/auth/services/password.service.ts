import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { compare, genSalt } from "bcryptjs";
import { hash } from "crypto";
import { UserService } from "src/users/users.service";

@Injectable()
export class PasswordService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ){}

    async hashPassword(password:string){
        const salt = await genSalt(10); //hashleme maliyeti
        return hash(password, salt);
    }

    async compare(
        proviced: string,
        stored: string,
    ):Promise<boolean>{
        return compare(proviced, stored);
    }
}