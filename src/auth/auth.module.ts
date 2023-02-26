import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AdminModule} from '../admin/admin.module';
import { AuthService } from './auth.service';
import { PassportModule} from '@nestjs/passport';
import { LocalStrategy } from './local.stategy';
import { JwtConstants } from './auth.constant';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        AdminModule, 
        PassportModule, 
        JwtModule.register({
            secret: JwtConstants.secret,
            signOptions: {expiresIn: '60s'},
        })],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
