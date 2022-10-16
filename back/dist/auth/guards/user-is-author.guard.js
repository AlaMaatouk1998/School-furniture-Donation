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
exports.UserIsAuthorGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/service/user.service");
const furniture_service_1 = require("../../furniture/service/furniture.service");
const operators_1 = require("rxjs/operators");
let UserIsAuthorGuard = class UserIsAuthorGuard {
    constructor(userService, furnitureService) {
        this.userService = userService;
        this.furnitureService = furnitureService;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const params = request.params;
        const furnitureId = Number(params.id);
        const user = request.user;
        return this.userService.findUser(user.id).pipe((0, operators_1.switchMap)((user) => this.furnitureService.findOne(furnitureId).pipe((0, operators_1.map)((furniture) => {
            let hasPermission = false;
            if (user.id === furniture.author.id) {
                hasPermission = true;
            }
            return user && hasPermission;
        }))));
    }
};
UserIsAuthorGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        furniture_service_1.FurnitureService])
], UserIsAuthorGuard);
exports.UserIsAuthorGuard = UserIsAuthorGuard;
//# sourceMappingURL=user-is-author.guard.js.map