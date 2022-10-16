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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FurnitureCategoryEntity = void 0;
const furniture_entity_1 = require("../../furniture/model/furniture.entity");
const studyLevel_entity_1 = require("../../studyLevel/model/studyLevel.entity");
const typeorm_1 = require("typeorm");
let FurnitureCategoryEntity = class FurnitureCategoryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FurnitureCategoryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FurnitureCategoryEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureCategoryEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureCategoryEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => furniture_entity_1.FurnitureEntity, (furnitureEntity) => furnitureEntity.furnitureCategory),
    __metadata("design:type", Array)
], FurnitureCategoryEntity.prototype, "furnitures", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => studyLevel_entity_1.StudyLevelEntity, (studyLevel) => studyLevel.categories),
    __metadata("design:type", studyLevel_entity_1.StudyLevelEntity)
], FurnitureCategoryEntity.prototype, "studyLevel", void 0);
FurnitureCategoryEntity = __decorate([
    (0, typeorm_1.Entity)('furnitureCategory')
], FurnitureCategoryEntity);
exports.FurnitureCategoryEntity = FurnitureCategoryEntity;
//# sourceMappingURL=furnitureCategory.entity.js.map