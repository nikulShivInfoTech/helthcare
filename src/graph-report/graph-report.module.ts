import { Module } from '@nestjs/common';
import { GraphReportService } from './graph-report.service';
import { GraphReportController } from './graph-report.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthModel } from 'src/model/health.model';
import { UserModel } from 'src/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([HealthModel, UserModel])],
  controllers: [GraphReportController],
  providers: [GraphReportService],
})
export class GraphReportModule {}
