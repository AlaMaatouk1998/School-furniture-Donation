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
exports.FurnitureController = exports.storage = exports.BLOG_ENTRIES_URL = void 0;
const common_1 = require("@nestjs/common");
const furniture_service_1 = require("../service/furniture.service");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_is_author_guard_1 = require("../../auth/guards/user-is-author.guard");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
const path_1 = require("path");
const user_interface_1 = require("../../user/model/user.interface");
exports.BLOG_ENTRIES_URL = 'http://localhost:3000/api/furnitures';
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
let FurnitureController = class FurnitureController {
    constructor(furnitureService) {
        this.furnitureService = furnitureService;
    }
    create(categoryId, furniture, req) {
        const user = req.user;
        return this.furnitureService.create(user, furniture, categoryId);
    }
    index() {
        return this.furnitureService.findAll();
    }
    indexByUser(userId) {
        return this.furnitureService.paginateByUser(Number(userId));
    }
    findOne(id) {
        return this.furnitureService.findOne(id);
    }
    updateOne(categoryId, id, furniture) {
        return this.furnitureService.updateOne(Number(id), furniture, categoryId);
    }
    deleteOne(id) {
        return this.furnitureService.deleteOne(id);
    }
    uploadFile(file, req) {
        return (0, rxjs_1.of)(file);
    }
    findimage(imagename, res) {
        return (0, rxjs_1.of)(res.sendFile((0, path_1.join)(process.cwd(), 'uploads/blog-entry-images/' + imagename)));
    }
};
__decorate([
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.ADMIN),
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.GIVER),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FurnitureController.prototype, "index", null);
__decorate([
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.GIVER),
    (0, common_1.Get)('user/:user'),
    __param(0, (0, common_1.Param)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], FurnitureController.prototype, "indexByUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Put)(':id/:categoryId'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "updateOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, user_is_author_guard_1.UserIsAuthorGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "deleteOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('image/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', exports.storage)),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)('image/:imagename'),
    __param(0, (0, common_1.Param)('imagename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], FurnitureController.prototype, "findimage", null);
FurnitureController = __decorate([
    (0, common_1.Controller)('furnitures'),
    __metadata("design:paramtypes", [furniture_service_1.FurnitureService])
], FurnitureController);
exports.FurnitureController = FurnitureController;
//# sourceMappingURL=furniture.controller.js.map