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
import { FurnitureToTakerService } from '../service/furnitureToTaker.service';
import { Observable, of } from 'rxjs';
import { FurnitureToTaker } from '../model/furnitureToTaker.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FurnitureToTakerEntity } from '../model/furnitureToTaker.entity';
import { Furniture } from 'src/furniture/model/furniture.interface';
import { UserIsAuthorGuard } from 'src/auth/guards/user-is-author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Image } from '../model/image.interface';
import { join } from 'path';

export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/blog-entries';

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

@Controller('furnitureToTakers')
export class FurnitureToTakerController {
  constructor(private furnitureToTakerService: FurnitureToTakerService) {}

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @Param('id') furniture: number,
    @Request() req,
  ): Observable<FurnitureToTaker> {
    const user = req.user;
    return this.furnitureToTakerService.create(furniture, user);
  }

  @Get()
  findFurnitureToTakers(): Observable<FurnitureToTaker[]> {
    return this.furnitureToTakerService.findAll();
  }

  // @Get('')
  // index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  //   limit = limit > 100 ? 100 : limit;

  //   return this.furnitureToTakerService.paginateAll({
  //     limit: Number(limit),
  //     page: Number(page),
  //     route: BLOG_ENTRIES_URL,
  //   });
  // }

  @Get('user/:user')
  indexByUser(@Param('user') userId: number) {
    return this.furnitureToTakerService.paginateByUser(Number(userId));
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<FurnitureToTaker> {
    return this.furnitureToTakerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateOne(
    @Param('id') id: number,
    @Body() furnitureToTaker: FurnitureToTaker,
  ): Observable<FurnitureToTaker> {
    return this.furnitureToTakerService.updateOne(Number(id), furnitureToTaker);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteOne(@Param('id') id: number): Observable<any> {
    return this.furnitureToTakerService.deleteOne(id);
  }
}
