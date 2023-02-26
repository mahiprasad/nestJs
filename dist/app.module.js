"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const admin_module_1 = require("./admin/admin.module");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./auth/auth.module");
const profile_module_1 = require("./profile/profile.module");
const mailer_1 = require("@nestjs-modules/mailer");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            profile_module_1.ProfileModule,
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.sendgrid.net',
                    auth: {
                        user: 'apikey',
                        pass: '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'
                    }
                }
            })
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map