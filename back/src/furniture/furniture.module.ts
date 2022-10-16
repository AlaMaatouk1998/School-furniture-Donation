import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnitureEntity } from './model/furniture.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FurnitureController } from './controller/furniture.controller';
import { FurnitureService } from './service/furniture.service';
import { FurnitureCategoryModule } from 'src/furnitureCategory/furnitureCategory.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FurnitureEntity]),
    AuthModule,
    UserModule,
    FurnitureCategoryModule,
  ],
  controllers: [FurnitureController],
  providers: [FurnitureService],
  exports: [FurnitureService],
})
export class FurnitureModule {}
