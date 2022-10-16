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
exports.FurnitureEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/model/user.entity");
const furnitureCategory_entity_1 = require("../../furnitureCategory/model/furnitureCategory.entity");
let FurnitureEntity = class FurnitureEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FurnitureEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], FurnitureEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 'slug' }),
    __metadata("design:type", String)
], FurnitureEntity.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], FurnitureEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FurnitureEntity.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], FurnitureEntity.prototype, "quantityAvl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], FurnitureEntity.prototype, "headerImage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], FurnitureEntity.prototype, "publishedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], FurnitureEntity.prototype, "isPublished", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.UserEntity, (user) => user.furnitures),
    __metadata("design:type", user_entity_1.UserEntity)
], FurnitureEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => furnitureCategory_entity_1.FurnitureCategoryEntity, (furnitureCategory) => furnitureCategory.furnitures),
    __metadata("design:type", furnitureCategory_entity_1.FurnitureCategoryEntity)
], FurnitureEntity.prototype, "furnitureCategory", void 0);
FurnitureEntity = __decorate([
    (0, typeorm_1.Entity)('furniture')
], FurnitureEntity);
exports.FurnitureEntity = FurnitureEntity;
//# sourceMappingURL=furniture.entity.js.map