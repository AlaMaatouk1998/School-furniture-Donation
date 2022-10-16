"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const furniture_entity_1 = require("./model/furniture.entity");
const auth_module_1 = require("../auth/auth.module");
const user_module_1 = require("../user/user.module");
const furniture_controller_1 = require("./controller/furniture.controller");
const furniture_service_1 = require("./service/furniture.service");
const furnitureCategory_module_1 = require("../furnitureCategory/furnitureCategory.module");
let FurnitureModule = class FurnitureModule {
};
FurnitureModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([furniture_entity_1.FurnitureEntity]),
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            furnitureCategory_module_1.FurnitureCategoryModule,
        ],
        controllers: [furniture_controller_1.FurnitureController],
        providers: [furniture_service_1.FurnitureService],
        exports: [furniture_service_1.FurnitureService],
    })
], FurnitureModule);
exports.FurnitureModule = FurnitureModule;
//# sourceMappingURL=furniture.module.js.map