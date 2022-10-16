"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureToTakerModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const furnitureToTaker_entity_1 = require("./model/furnitureToTaker.entity");
const furnitureToTaker_controller_1 = require("./controller/furnitureToTaker.controller");
const furnitureToTaker_service_1 = require("./service/furnitureToTaker.service");
const furniture_module_1 = require("../furniture/furniture.module");
let FurnitureToTakerModule = class FurnitureToTakerModule {
};
FurnitureToTakerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([furnitureToTaker_entity_1.FurnitureToTakerEntity]),
            furniture_module_1.FurnitureModule,
        ],
        controllers: [furnitureToTaker_controller_1.FurnitureToTakerController],
        providers: [furnitureToTaker_service_1.FurnitureToTakerService],
        exports: [furnitureToTaker_service_1.FurnitureToTakerService],
    })
], FurnitureToTakerModule);
exports.FurnitureToTakerModule = FurnitureToTakerModule;
//# sourceMappingURL=furnitureToTaker.module.js.map