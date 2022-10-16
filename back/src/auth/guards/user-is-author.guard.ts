import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/user/service/user.service';
import { FurnitureService } from 'src/furniture/service/furniture.service';
import { Observable } from 'rxjs';
import { User } from 'src/user/model/user.interface';
import { switchMap, map } from 'rxjs/operators';
import { Furniture } from 'src/furniture/model/furniture.interface';

@Injectable()
export class UserIsAuthorGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private furnitureService: FurnitureService,
  ) {}

  canActivate(context: ExecutionContext): Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const params = request.params;
    const furnitureId: number = Number(params.id);
    const user: User = request.user;

    return this.userService.findUser(user.id).pipe(
      switchMap((user: User) =>
        this.furnitureService.findOne(furnitureId).pipe(
          map((furniture: Furniture) => {
            let hasPermission = false;

            if (user.id === furniture.author.id) {
              hasPermission = true;
            }

            return user && hasPermission;
          }),
        ),
      ),
    );
  }
}
