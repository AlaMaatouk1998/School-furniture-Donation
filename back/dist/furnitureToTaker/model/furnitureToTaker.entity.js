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
exports.FurnitureToTakerEntity = void 0;
const typeorm_1 = require("typeorm");
const furniture_entity_1 = require("../../furniture/model/furniture.entity");
const user_entity_1 = require("../../user/model/user.entity");
let FurnitureToTakerEntity = class FurnitureToTakerEntity {
    updateTimestamp() {
        this.updatedAt = new Date();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], FurnitureToTakerEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureToTakerEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TimESTAMP' }),
    __metadata("design:type", Date)
], FurnitureToTakerEntity.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FurnitureToTakerEntity.prototype, "updateTimestamp", null);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], FurnitureToTakerEntity.prototype, "publishedDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], FurnitureToTakerEntity.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], FurnitureToTakerEntity.prototype, "accepted", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.UserEntity, (taker) => taker.furnitures),
    __metadata("design:type", user_entity_1.UserEntity)
], FurnitureToTakerEntity.prototype, "taker", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => furniture_entity_1.FurnitureEntity, (furniture) => furniture.author),
    __metadata("design:type", furniture_entity_1.FurnitureEntity)
], FurnitureToTakerEntity.prototype, "furniture", void 0);
FurnitureToTakerEntity = __decorate([
    (0, typeorm_1.Entity)('furnitureTotaker')
], FurnitureToTakerEntity);
exports.FurnitureToTakerEntity = FurnitureToTakerEntity;
//# sourceMappingURL=furnitureToTaker.entity.js.map