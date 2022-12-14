import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User, UserRole } from '../model/user.interface';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { hasRoles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Pagination } from 'nestjs-typeorm-paginate';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { UserIsUserGuard } from 'src/auth/guards/UserIsUser.guard';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileReceiverages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  create(@Body() user: User): Observable<User | Object> {
    return this.userService.create(user).pipe(
      map((user: User) => user),
      catchError((err) => of({ error: err.message })),
    );
  }

  @Post('login')
  login(@Body() user: User): Observable<any> {
    return this.userService.login(user).pipe(
      map((res) => {
        return res;
      }),
    );
  }

  @Get('findbyId/:id')
  findOne(@Param() params): Observable<User> {
    return this.userService.findUser(params.id);
  }

  @Get()
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('username') username: string,
  ): Observable<Pagination<User>> {
    limit = limit > 100 ? 100 : limit;

    if (username === null || username === undefined) {
      return this.userService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/api/users',
      });
    } else {
      return this.userService.paginateFilterByUsername(
        {
          page: Number(page),
          limit: Number(limit),
          route: 'http://localhost:3000/api/users',
        },
        { username },
      );
    }
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: string): Observable<any> {
    return this.userService.deleteOne(Number(id));
  }
  @UseGuards(JwtAuthGuard, UserIsUserGuard)
  @Put(':id')
  updateOne(@Param('id') id: string, @Body() user: User): Observable<any> {
    return this.userService.updateOne(Number(id), user);
  }

  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Put(':id/role')
  updateRoleOfUser(
    @Param('id') id: string,
    @Body() user: User,
  ): Observable<User> {
    return this.userService.updateRoleOfUser(Number(id), user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Object> {
    const user: User = req.user;

    return this.userService
      .updateOne(user.id, { profileImage: file.filename })
      .pipe(
        tap((giver: User) => console.log(giver)),
        map((giver: User) => ({
          profileImage: giver.profileImage,
        })),
      );
  }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('hello')
  getHello(@Request() req): String {
    const user: User = req.user;
    return JSON.stringify(user);
  }
  @UseGuards(JwtAuthGuard)
  @Get('hey')
  getHey(@Request() req): String {
    const user: User = req.user;
    return JSON.stringify(user);
  }
}
