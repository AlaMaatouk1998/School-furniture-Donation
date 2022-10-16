import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { StudyLevelModule } from 'src/studyLevel/studyLevel.module';
import { UserModule } from 'src/user/user.module';
import { FurnitureCategoryController } from './controller/furnitureCategory.controller';
import { FurnitureCategoryEntity } from './model/furnitureCategory.entity';
import { FurnitureCategoryService } from './service/furnitureCategory.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FurnitureCategoryEntity]),
    StudyLevelModule,
  ],
  controllers: [FurnitureCategoryController],
  providers: [FurnitureCategoryService],
  exports: [FurnitureCategoryService],
})
export class FurnitureCategoryModule {}
