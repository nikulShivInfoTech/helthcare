import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { HealthModel } from 'src/model/health.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([HealthModel])],
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
