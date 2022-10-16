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
exports.FurnitureService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const furniture_entity_1 = require("../model/furniture.entity");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const furnitureCategory_service_1 = require("../../furnitureCategory/service/furnitureCategory.service");
const slugify = require('slugify');
let FurnitureService = class FurnitureService {
    constructor(furnitureRepository, furnitureCategoryService) {
        this.furnitureRepository = furnitureRepository;
        this.furnitureCategoryService = furnitureCategoryService;
    }
    create(user, furniture, category) {
        furniture.author = user;
        console.log(furniture);
        return (0, rxjs_1.from)(this.furnitureCategoryService.findOne(category)).pipe((0, operators_1.switchMap)((Fur) => {
            furniture.furnitureCategory = Fur;
            return (0, rxjs_1.from)(this.furnitureRepository.save(furniture));
        }));
    }
    findAll() {
        return (0, rxjs_1.from)(this.furnitureRepository.find({
            relations: [
                'author',
                'furnitureCategory',
                'furnitureCategory.studyLevel',
            ],
        }));
    }
    paginateAll(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.furnitureRepository, options, {
            relations: [
                'author',
                'furnitureCategory',
                'furnitureCategory.studyLevel',
            ],
        })).pipe((0, operators_1.map)((furnitures) => furnitures));
    }
    paginateByUser(userId) {
        {
            return (0, rxjs_1.from)(this.furnitureRepository.find({
                relations: [
                    'auhtor',
                    'furnitureCategory',
                    'furnitureCategory.studyLevel',
                ],
                where: { author: { id: userId } },
            })).pipe((0, operators_1.map)((furnitures) => furnitures));
        }
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.furnitureRepository.findOne({
            where: {
                id: id,
            },
            relations: ['author'],
        }));
    }
    findByUser(userId) {
        return (0, rxjs_1.from)(this.furnitureRepository.find({
            where: {
                author: { id: userId },
            },
            relations: ['author'],
        })).pipe((0, operators_1.map)((furnitures) => furnitures));
    }
    updateOne(id, furniture, categoryId) {
        return (0, rxjs_1.from)(this.furnitureCategoryService.findOne(categoryId)).pipe((0, operators_1.switchMap)((Fur) => {
            furniture.furnitureCategory = Fur;
            return (0, rxjs_1.from)(this.furnitureRepository.update(id, furniture)).pipe((0, operators_1.switchMap)(() => this.findOne(id)));
        }));
    }
    deleteOne(id) {
        return (0, rxjs_1.from)(this.furnitureRepository.delete(id));
    }
    generateSlug(title) {
        return (0, rxjs_1.of)(slugify(title));
    }
};
FurnitureService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(furniture_entity_1.FurnitureEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        furnitureCategory_service_1.FurnitureCategoryService])
], FurnitureService);
exports.FurnitureService = FurnitureService;
//# sourceMappingURL=furniture.service.js.map