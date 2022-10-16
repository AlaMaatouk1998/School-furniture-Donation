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
exports.FurnitureToTakerService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const furnitureToTaker_entity_1 = require("../model/furnitureToTaker.entity");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const furniture_service_1 = require("../../furniture/service/furniture.service");
const slugify = require('slugify');
let FurnitureToTakerService = class FurnitureToTakerService {
    constructor(furnitureToTakerRepository, furnitureService) {
        this.furnitureToTakerRepository = furnitureToTakerRepository;
        this.furnitureService = furnitureService;
    }
    create(furniture, user) {
        return (0, rxjs_1.from)(this.furnitureService.findOne(furniture)).pipe((0, operators_1.switchMap)((Fur) => {
            const f = new furnitureToTaker_entity_1.FurnitureToTakerEntity();
            f.taker = user;
            f.furniture = Fur;
            return (0, rxjs_1.from)(this.furnitureToTakerRepository.save(f));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.furnitureToTakerRepository.find({
            relations: [
                'taker',
                'furniture',
                'furniture.furnitureCategory',
                'furniture.furnitureCategory.studyLevel',
            ],
        }));
    }
    paginateAll(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.furnitureToTakerRepository, options, {
            relations: ['author'],
        })).pipe((0, operators_1.map)((furnitureToTakers) => furnitureToTakers));
    }
    paginateByUser(userId) {
        {
            return (0, rxjs_1.from)(this.furnitureToTakerRepository.find({
                relations: ['author'],
                where: { taker: { id: userId } },
            })).pipe((0, operators_1.map)((furnitureToTakers) => furnitureToTakers));
        }
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.furnitureToTakerRepository.findOne({
            where: {
                id: id,
            },
            relations: ['author'],
        }));
    }
    findByUser(userId) {
        return (0, rxjs_1.from)(this.furnitureToTakerRepository.find({
            where: {
                taker: { id: userId },
            },
        })).pipe((0, operators_1.map)((furnitureToTakers) => furnitureToTakers));
    }
    updateOne(id, furnitureToTaker) {
        return (0, rxjs_1.from)(this.furnitureToTakerRepository.update(id, furnitureToTaker)).pipe((0, operators_1.switchMap)(() => this.findOne(id)));
    }
    deleteOne(id) {
        return (0, rxjs_1.from)(this.furnitureToTakerRepository.delete(id));
    }
    generateSlug(title) {
        return (0, rxjs_1.of)(slugify(title));
    }
};
FurnitureToTakerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(furnitureToTaker_entity_1.FurnitureToTakerEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        furniture_service_1.FurnitureService])
], FurnitureToTakerService);
exports.FurnitureToTakerService = FurnitureToTakerService;
//# sourceMappingURL=furnitureToTaker.service.js.map