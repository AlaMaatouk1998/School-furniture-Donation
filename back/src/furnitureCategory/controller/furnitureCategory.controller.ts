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
import { FurnitureCategoryService } from '../service/furnitureCategory.service';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRoles } from 'src/common/decorators/roles.decorator';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { UserRole } from 'src/user/model/user.interface';
import { FurnitureCategory } from '../model/furnitureCategory.interface';

@Controller('furnitureCategory')
export class FurnitureCategoryController {
  constructor(private furnitureCategoryService: FurnitureCategoryService) {}
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post(':id')
  create(
    @Param('id') studylevelId: number,
    @Body() furnitureCategory: FurnitureCategory,
  ): Observable<FurnitureCategory> {
    return this.furnitureCategoryService.create(
      studylevelId,
      furnitureCategory,
    );
  }

  // @Get()
  // findFurnitureCategorys(@Query('userId') userId: number): Observable<FurnitureCategory[]> {
  //     if(userId == null) {
  //         return this.furnitureCategoryService.findAll();
  //     } else {
  //         return this.furnitureCategoryService.findByUser(userId);
  //     }
  // }
  @Get('')
  index() {
    return this.furnitureCategoryService.findAll();
  }
  // @Get('')
  // index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  //   limit = limit > 100 ? 100 : limit;

  //   return this.furnitureCategoryService.paginateAll({
  //     limit: Number(limit),
  //     page: Number(page),
  //     route: BLOG_ENTRIES_URL,
  //   });
  // }

  // @Get('user/:user')
  // indexByUser(@Param('user') userId: number) {
  //   return this.furnitureCategoryService.paginateByUser(Number(userId));
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Observable<FurnitureCategory> {
  //   return this.furnitureCategoryService.findOne(id);
  // }

  // @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  // @Put(':id')
  // updateOne(
  //   @Param('id') id: number,
  //   @Body() furnitureCategory: FurnitureCategory,
  // ): Observable<FurnitureCategory> {
  //   return this.furnitureCategoryService.updateOne(Number(id), furnitureCategory);
  // }

  // @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  // @Delete(':id')
  // deleteOne(@Param('id') id: number): Observable<any> {
  //   return this.furnitureCategoryService.deleteOne(id);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('image/upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadFile(@UploadedFile() file, @Request() req): Observable<Image> {
  //   return of(file);
  // }

  // @Get('image/:imagename')
  // findimage(@Param('imagename') imagename, @Res() res): Observable<Object> {
  //   return of(
  //     res.sendFile(
  //       join(process.cwd(), 'uploads/blog-entry-images/' + imagename),
  //     ),
  //   );
  // }
}
