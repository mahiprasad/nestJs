import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private adminService;
    private jwtService;
    constructor(adminService: AdminService, jwtService: JwtService);
    validateAdmin(email: string, password: string): Promise<any>;
    login(admin: any): Promise<{
        access_token: string;
    }>;
}
