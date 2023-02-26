import { AdminService } from './admin.service';
export declare class AdminController {
    private adminService;
    constructor(adminService: AdminService);
    loginEmail(email: any): Promise<any>;
    otpVerify(otp: any): Promise<any>;
}
