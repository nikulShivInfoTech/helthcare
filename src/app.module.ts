import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { SequelizeModule } from '@nestjs/sequelize';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import * as dotenv from 'dotenv';
import { UserModel } from './model/user.model';
import { HealthModel } from './model/health.model';
import { UserModule } from './users/users.module';
import { DiseasesModel } from './model/disease.model';
import { CureSuggestionsModel } from './model/cureTips.model';
import { HealthTipsModule } from './health-tips/health-tips.module';
import { ScheduleModule } from '@nestjs/schedule';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [UserModel, DiseasesModel, CureSuggestionsModel, HealthModel],
      autoLoadModels: true,
      synchronize: true,
    }),

    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    HealthModule,
    UserModule,
    HealthTipsModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
