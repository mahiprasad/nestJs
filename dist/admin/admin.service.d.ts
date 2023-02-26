import { Db } from 'mongodb';
import { MailerService } from '@nestjs-modules/mailer';
export declare class AdminService {
    private database;
    private mailerService;
    constructor(database: Db, mailerService: MailerService);
    db: import("mongodb").Collection<import("bson").Document>;
    sendMail(email: any, otp: any): Promise<string>;
    getByEmail(email: any): Promise<any>;
    verifyOtp(otp: any): Promise<any>;
    validateEmail(email: any): Promise<any>;
}
