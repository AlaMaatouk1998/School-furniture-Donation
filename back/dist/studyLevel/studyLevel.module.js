"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyLevelModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const studyLevel_controller_1 = require("./controller/studyLevel.controller");
const studyLevel_entity_1 = require("./model/studyLevel.entity");
const studyLevel_service_1 = require("./service/studyLevel.service");
let StudyLevelModule = class StudyLevelModule {
};
StudyLevelModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([studyLevel_entity_1.StudyLevelEntity])],
        controllers: [studyLevel_controller_1.StudyLevelController],
        providers: [studyLevel_service_1.StudyLevelService],
        exports: [studyLevel_service_1.StudyLevelService],
    })
], StudyLevelModule);
exports.StudyLevelModule = StudyLevelModule;
//# sourceMappingURL=studyLevel.module.js.map