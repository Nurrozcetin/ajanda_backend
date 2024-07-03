import { Module, forwardRef } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "src/users/users.module";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PasswordService } from "./services/password.service";

@Module({
    imports:[
        UserModule, PassportModule, JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '60s'},
        }),
        forwardRef(() => UserModule)
    ],
    providers:[AuthService, LocalStrategy, JwtStrategy, PasswordService],
    exports:[AuthService, PasswordService],
})
export class AuthModule{}