import { Controller, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController{

    constructor(
        private adminService: AdminService) {}
    

    @Post('login')
    async loginEmail(@Body() email){
        const res = await this.adminService.getByEmail(email.email);
        return res;
    }

    @Post('login/verify')
    async otpVerify(@Body() otp){
        console.log(otp.otp);
        return await this.adminService.verifyOtp(otp.otp);
    }

    // @Get()
    // getAdmin(){
    //     return this.adminService.findAll();
    // } 

    // @Post()
    // async storeAdmin(
    //     @Body() body: CreateAdminDto
    //     ): Promise <void>{
    //     const createMsg = await this.adminService.create(body);
    //     return createMsg;
    // }

    // @Patch(':adminId')
    // async updateAdmin(
    //     @Param('adminId') adminId: string,
    //     @Body() body: UpdateAdminDto
    //     ): Promise <void> {
    //     return this.adminService.update(adminId, body);
    // }
    
    // @Get(':adminId')
    // getOneAdmin(
    //     @Param('adminId') adminId: string
    //     ){
    //     return this.adminService.getOne(adminId);
    // }

    // @Delete(':adminId')
    // removeAdmin(
    //     @Param('adminId') adminId: string
    //     ){
    //     return this.adminService.delete(adminId);
    // }
    

}