import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { FurnitureService } from 'src/furniture/service/furniture.service';
import { Observable } from 'rxjs';
export declare class UserIsAuthorGuard implements CanActivate {
    private userService;
    private furnitureService;
    constructor(userService: UserService, furnitureService: FurnitureService);
    canActivate(context: ExecutionContext): Observable<boolean>;
}
