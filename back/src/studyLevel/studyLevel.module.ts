import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudyLevelController } from './controller/studyLevel.controller';
import { StudyLevelEntity } from './model/studyLevel.entity';
import { StudyLevelService } from './service/studyLevel.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudyLevelEntity])],
  controllers: [StudyLevelController],
  providers: [StudyLevelService],
  exports: [StudyLevelService],
})
export class StudyLevelModule {}
