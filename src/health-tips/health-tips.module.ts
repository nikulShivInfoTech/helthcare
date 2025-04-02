import { Module } from '@nestjs/common';
import { HealthTipsService } from './health-tips.service';
import { HealthTipsController } from './health-tips.controller';
import { UserModel } from 'src/model/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { DiseasesModel } from 'src/model/disease.model';
import { CureSuggestionsModel } from 'src/model/cureTips.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      UserModel,
      DiseasesModel,
      CureSuggestionsModel,
    ]),
  ],
  controllers: [HealthTipsController],
  providers: [HealthTipsService],
})
export class HealthTipsModule {}
