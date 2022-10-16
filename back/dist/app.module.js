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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const furniture_module_1 = require("./furniture/furniture.module");
const typeorm_1 = require("@nestjs/typeorm");
const furnitureToTaker_module_1 = require("./furnitureToTaker/furnitureToTaker.module");
const studyLevel_module_1 = require("./studyLevel/studyLevel.module");
const furnitureCategory_module_1 = require("./furnitureCategory/furnitureCategory.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'password',
                database: 'data5',
                entities: [],
                autoLoadEntities: true,
                synchronize: false,
            }),
            studyLevel_module_1.StudyLevelModule,
            furnitureToTaker_module_1.FurnitureToTakerModule,
            furnitureCategory_module_1.FurnitureCategoryModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            furniture_module_1.FurnitureModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map