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
exports.FurnitureToTakerController = exports.storage = exports.BLOG_ENTRIES_URL = void 0;
const common_1 = require("@nestjs/common");
const furnitureToTaker_service_1 = require("../service/furnitureToTaker.service");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
exports.BLOG_ENTRIES_URL = 'http://localhost:3000/api/blog-entries';
exports.storage = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename = path.parse(file.originalname).name.replace(/\s/g, '') + (0, uuid_1.v4)();
            const extension = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
        },
    }),
};
let FurnitureToTakerController = class FurnitureToTakerController {
    constructor(furnitureToTakerService) {
        this.furnitureToTakerService = furnitureToTakerService;
    }
    create(furniture, req) {
        const user = req.user;
        return this.furnitureToTakerService.create(furniture, user);
    }
    findFurnitureToTakers() {
        return this.furnitureToTakerService.findAll();
    }
    indexByUser(userId) {
        return this.furnitureToTakerService.paginateByUser(Number(userId));
    }
    findOne(id) {
        return this.furnitureToTakerService.findOne(id);
    }
    updateOne(id, furnitureToTaker) {
        return this.furnitureToTakerService.updateOne(Number(id), furnitureToTaker);
    }
    deleteOne(id) {
        return this.furnitureToTakerService.deleteOne(id);
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureToTakerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureToTakerController.prototype, "findFurnitureToTakers", null);
__decorate([
    (0, common_1.Get)('user/:user'),
    __param(0, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FurnitureToTakerController.prototype, "indexByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureToTakerController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureToTakerController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureToTakerController.prototype, "deleteOne", null);
FurnitureToTakerController = __decorate([
    (0, common_1.Controller)('furnitureToTakers'),
    __metadata("design:paramtypes", [furnitureToTaker_service_1.FurnitureToTakerService])
], FurnitureToTakerController);
exports.FurnitureToTakerController = FurnitureToTakerController;
//# sourceMappingURL=furnitureToTaker.controller.js.map