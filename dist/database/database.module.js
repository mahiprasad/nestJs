"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const mongodb_1 = require("mongodb");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            {
                provide: 'DATABASE_CONNECTION',
                useFactory: async () => {
                    try {
                        const client = await mongodb_1.MongoClient.connect('mongodb://127.0.0.1:27017', {});
                        return client.db('FoodDB');
                    }
                    catch (e) {
                        console.log(e);
                        throw e;
                    }
                }
            },
        ],
        exports: ['DATABASE_CONNECTION'],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map