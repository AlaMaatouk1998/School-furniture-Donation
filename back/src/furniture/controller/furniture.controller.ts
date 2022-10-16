import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Get,
  Query,
  Param,
  Delete,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { FurnitureService } from '../service/furniture.service';
import { Observable, of } from 'rxjs';
import { Furniture } from '../model/furniture.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRoles } from 'src/common/decorators/roles.decorator';

import { FurnitureEntity } from '../model/furniture.entity';
import { UserIsAuthorGuard } from 'src/auth/guards/user-is-author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Image } from '../model/image.interface';
import { join } from 'path';
import { UserRole } from 'src/user/model/user.interface';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/furnitures';

export const storage = {
  storage: diskStorage({
    destination: './uploads/blog-entry-images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('furnitures')
export class FurnitureController {
  constructor(private furnitureService: FurnitureService) {}
  @hasRoles(UserRole.ADMIN)
  @hasRoles(UserRole.GIVER)
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @Param('id') categoryId: number,
    @Body() furniture: Furniture,
    @Request() req,
  ): Observable<Furniture> {
    const user = req.user;
    return this.furnitureService.create(user, furniture, categoryId);
  }

  // @Get()
  // findFurnitures(@Query('userId') userId: number): Observable<Furniture[]> {
  //     if(userId == null) {
  //         return this.furnitureService.findAll();
  //     } else {
  //         return this.furnitureService.findByUser(userId);
  //     }
  // }

  // @Get('')
  // index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  //   limit = limit > 100 ? 100 : limit;

  //   return this.furnitureService.paginateAll({
  //     limit: Number(limit),
  //     page: Number(page),
  //     route: BLOG_ENTRIES_URL,
  //   });
  // }
  @Get('')
  index() {
    return this.furnitureService.findAll();
  }
  @hasRoles(UserRole.GIVER)
  @Get('user/:user')
  indexByUser(@Param('user') userId: number) {
    return this.furnitureService.paginateByUser(Number(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<Furniture> {
    return this.furnitureService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Put(':id/:categoryId')
  updateOne(
    @Param('id') categoryId: number,

    @Param('id') id: number,
    @Body() furniture: Furniture,
  ): Observable<Furniture> {
    return this.furnitureService.updateOne(Number(id), furniture, categoryId);
  }

  @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.furnitureService.deleteOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
    return of(file);
  }

  @Get('image/:imagename')
  findimage(@Param('imagename') imagename, @Res() res): Observable<Object> {
    return of(
      res.sendFile(
        join(process.cwd(), 'uploads/blog-entry-images/' + imagename),
      ),
    );
  }
}
