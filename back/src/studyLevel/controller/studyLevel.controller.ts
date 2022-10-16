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
import { StudyLevelService } from '../service/studyLevel.service';
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { hasRoles } from 'src/common/decorators/roles.decorator';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { UserRole } from 'src/user/model/user.interface';
import { StudyLevel } from '../model/studyLevel.interface';
export const BLOG_ENTRIES_URL = 'http://localhost:3000/api/studyLevel';

@Controller('studyLevel')
export class StudyLevelController {
  constructor(private studyLevelService: StudyLevelService) {}
  @hasRoles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() studyLevel: StudyLevel): Observable<StudyLevel> {
    return this.studyLevelService.create(studyLevel);
  }

  // @Get()
  // findStudyLevels(@Query('userId') userId: number): Observable<StudyLevel[]> {
  //     if(userId == null) {
  //         return this.studyLevelService.findAll();
  //     } else {
  //         return this.studyLevelService.findByUser(userId);
  //     }
  // }

  @Get('')
  index() {
    return this.studyLevelService.findAll();
  }

  // @Get('')
  // index(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
  //   limit = limit > 100 ? 100 : limit;

  //   return this.studyLevelService.paginateAll({
  //     limit: Number(limit),
  //     page: Number(page),
  //     route: BLOG_ENTRIES_URL,
  //   });
  // }
  // @Get('user/:user')
  // indexByUser(@Param('user') userId: number) {
  //   return this.studyLevelService.paginateByUser(Number(userId));
  // }

  // @Get(':id')
  // findOne(@Param('id') id: number): Observable<StudyLevel> {
  //   return this.studyLevelService.findOne(id);
  // }

  // @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  // @Put(':id')
  // updateOne(
  //   @Param('id') id: number,
  //   @Body() studyLevel: StudyLevel,
  // ): Observable<StudyLevel> {
  //   return this.studyLevelService.updateOne(Number(id), studyLevel);
  // }

  // @UseGuards(JwtAuthGuard, UserIsAuthorGuard)
  // @Delete(':id')
  // deleteOne(@Param('id') id: number): Observable<any> {
  //   return this.studyLevelService.deleteOne(id);
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
