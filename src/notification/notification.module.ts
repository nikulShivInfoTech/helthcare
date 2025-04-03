import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HealthModel } from 'src/model/health.model';

@Module({
  imports: [SequelizeModule.forFeature([HealthModel])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
