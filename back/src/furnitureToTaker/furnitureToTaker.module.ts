import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FurnitureToTakerEntity } from './model/furnitureToTaker.entity';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { FurnitureToTakerController } from './controller/furnitureToTaker.controller';
import { FurnitureToTakerService } from './service/furnitureToTaker.service';
import { FurnitureModule } from 'src/furniture/furniture.module';
import { FurnitureService } from 'src/furniture/service/furniture.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FurnitureToTakerEntity]),
    FurnitureModule,
  ],
  controllers: [FurnitureToTakerController],
  providers: [FurnitureToTakerService],
  exports: [FurnitureToTakerService],
})
export class FurnitureToTakerModule {}
