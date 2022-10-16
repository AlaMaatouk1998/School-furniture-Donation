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
exports.StudyLevelController = exports.BLOG_ENTRIES_URL = void 0;
const common_1 = require("@nestjs/common");
const studyLevel_service_1 = require("../service/studyLevel.service");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const user_interface_1 = require("../../user/model/user.interface");
exports.BLOG_ENTRIES_URL = 'http://localhost:3000/api/studyLevel';
let StudyLevelController = class StudyLevelController {
    constructor(studyLevelService) {
        this.studyLevelService = studyLevelService;
    }
    create(studyLevel) {
        return this.studyLevelService.create(studyLevel);
    }
    index() {
        return this.studyLevelService.findAll();
    }
};
__decorate([
    (0, roles_decorator_1.hasRoles)(user_interface_1.UserRole.ADMIN),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StudyLevelController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(''),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudyLevelController.prototype, "index", null);
StudyLevelController = __decorate([
    (0, common_1.Controller)('studyLevel'),
    __metadata("design:paramtypes", [studyLevel_service_1.StudyLevelService])
], StudyLevelController);
exports.StudyLevelController = StudyLevelController;
//# sourceMappingURL=studyLevel.controller.js.map