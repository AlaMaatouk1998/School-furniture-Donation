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
exports.StudyLevelService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const operators_1 = require("rxjs/operators");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const studyLevel_entity_1 = require("../model/studyLevel.entity");
const slugify = require('slugify');
let StudyLevelService = class StudyLevelService {
    constructor(studyLevelRepository) {
        this.studyLevelRepository = studyLevelRepository;
    }
    create(studyLevel) {
        return (0, rxjs_1.from)(this.studyLevelRepository.save(studyLevel));
    }
    findAll() {
        return (0, rxjs_1.from)(this.studyLevelRepository.find());
    }
    paginateAll(options) {
        return (0, rxjs_1.from)((0, nestjs_typeorm_paginate_1.paginate)(this.studyLevelRepository, options)).pipe((0, operators_1.map)((studyLevels) => studyLevels));
    }
    findOne(id) {
        return (0, rxjs_1.from)(this.studyLevelRepository.findOne({
            where: {
                id: id,
            },
        }));
    }
};
StudyLevelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(studyLevel_entity_1.StudyLevelEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StudyLevelService);
exports.StudyLevelService = StudyLevelService;
//# sourceMappingURL=studyLevel.service.js.map