"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
const mailer_1 = require("@nestjs-modules/mailer");
let AdminService = class AdminService {
    constructor(database, mailerService) {
        this.database = database;
        this.mailerService = mailerService;
        this.db = this.database.collection('people');
    }
    async sendMail(email, otp) {
        await this.mailerService.sendMail({
            to: email,
            from: 'oyebeautydev@gmail.com',
            subject: 'Verification Mail',
            html: `<h4>Your verification otp is: </h4> <h1> ` + otp + `</h1>`,
        });
        return 'mail sent';
    }
    async getByEmail(email) {
        try {
            console.log(email);
            if (!email)
                throw new common_1.BadRequestException;
            const otp = Math.floor(100000 + Math.random() * 90000);
            const response = await this.db.findOneAndUpdate({ email: email }, { $set: { tempOtp: otp } });
            console.log(response);
            response ? this.sendMail(email, otp) : common_1.NotFoundException;
        }
        catch (error) {
            throw new common_1.BadRequestException;
        }
    }
    async verifyOtp(otp) {
        try {
            if (!otp)
                throw new common_1.BadRequestException;
            const response = await this.db.findOneAndUpdate({ tempOtp: otp }, { $set: { tempOtp: null } });
            response.lastErrorObject.updatedExisting ? console.log('otp verified!') : new common_1.NotFoundException;
        }
        catch (err) {
            throw new common_1.BadRequestException;
        }
    }
    async validateEmail(email) {
        const res = await this.db.findOne({ email: email });
        res ? console.log(res) : console.log(email);
        return res;
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('DATABASE_CONNECTION')),
    __metadata("design:paramtypes", [mongodb_1.Db,
        mailer_1.MailerService])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map