import {  Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor (private authService: AuthService){};

    //apply the built-in Guard to initiate the passport-local flow
    @UseGuards(AuthGuard('local'))

    @Post('login')
        async login(@Request() req: any){
            console.log("printed from auth controller"+ req);
            return this.authService.login(req.user);
        }
    
    // @Get()
    // async getMe(){
    //     return this.authService.getMe();
    // }
}
