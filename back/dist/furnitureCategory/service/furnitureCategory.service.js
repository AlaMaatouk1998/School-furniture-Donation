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
exports.FurnitureCategoryService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const furnitureCategory_entity_1 = require("../model/furnitureCategory.entity");
const studyLevel_service_1 = require("../../studyLevel/service/studyLevel.service");
const slugify = require('slugify');
let FurnitureCategoryService = class FurnitureCategoryService {
    constructor(furnitureCategoryRepository, studyLevelService) {
        this.furnitureCategoryRepository = furnitureCategoryRepository;
        this.studyLevelService = studyLevelService;
    }
    create(levelSID, f) {
        return (0, rxjs_1.from)(this.studyLevelService.findOne(levelSID)).pipe((0, operators_1.switchMap)((Fur) => {
            f.studyLevel = Fur;
            return (0, rxjs_1.from)(this.furnitureCategoryRepository.save(f));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.furnitureCategoryRepository.find());
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.furnitureCategoryRepository.findOne({
            where: {
                id: id,
            },
        }));
    }
};
FurnitureCategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(furnitureCategory_entity_1.FurnitureCategoryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        studyLevel_service_1.StudyLevelService])
], FurnitureCategoryService);
exports.FurnitureCategoryService = FurnitureCategoryService;
//# sourceMappingURL=furnitureCategory.service.js.map