import { Injectable } from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor (
        private adminService: AdminService,
        private jwtService: JwtService
        ){};

    async validateAdmin(email:string, password:string): Promise<any> {
        const admin = await this.adminService.validateEmail(email);
        if (admin && admin.password == password){
                return admin;
            }
        return null;
    }

    async login(admin: any){
        const paylod = {email:admin.email, sub: admin.password};
        return{
            access_token: this.jwtService.sign(paylod),
        }
    }

    // async getMe():Promise <any>{
    //     return await this.adminService.getMe();
    // }
}
