import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { FurnitureModule } from './furniture/furniture.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FurnitureToTakerModule } from './furnitureToTaker/furnitureToTaker.module';
import { StudyLevelController } from './studyLevel/controller/studyLevel.controller';
import { StudyLevelModule } from './studyLevel/studyLevel.module';
import { FurnitureCategoryModule } from './furnitureCategory/furnitureCategory.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'data5',
      entities: [],
      autoLoadEntities: true,
      synchronize: false,
    }),
    StudyLevelModule,
    FurnitureToTakerModule,
    FurnitureCategoryModule,
    UserModule,
    AuthModule,
    FurnitureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
