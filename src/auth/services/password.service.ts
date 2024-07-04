import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { compare, genSalt, hash } from "bcryptjs";
import { UserService } from "src/users/users.service";

@Injectable()
export class PasswordService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
    ){}

    async hashPassword(password: string): Promise<string> {
        const salt = await genSalt(10);
        return hash(password, salt);
    }

    async compare(
        provided: string,
        stored: string,
    ): Promise<boolean> {
        return compare(provided, stored);
    }
}
