import { Controller, Get, UseGuards } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Controller('profile')
export class ProfileController {
    
    @UseGuards(AuthGuard('jwt'))

    @Get()
    profile(){
        console.log("accessed");
        return {message: "I'm protected route"}
    }
}
