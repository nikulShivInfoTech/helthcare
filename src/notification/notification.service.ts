import { Injectable, Logger } from '@nestjs/common';
import admin from '../config/firebase.config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HealthModel } from 'src/model/health.model';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(HealthModel)
    private readonly healthModel: typeof HealthModel,
  ) {}

  async sendPushNotification(dto: any) {
    const message = {
      notification: {
        title: dto.title,
        body: dto.body,
      },
      token: dto.token,
    };

    const response = await admin.messaging().send(message);
    console.log('Notification sent successfully:', response);
    return response;
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateDailyStatus() {
    const usersWithHealthData = await UserModel.findAll({
      include: [
        {
          model: HealthModel,
          required: false,
        },
      ],
    });

    for (let item of usersWithHealthData) {
      if (item.dataValues.healthData.length === 0) {
        const token = item.dataValues.device_token;
        const notificationPayload = {
          token,
          title: 'Reminder',
          body: 'Please update your health data for today.',
        };
        this.sendPushNotification(notificationPayload);
      }
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  async sendWaterIntakeReminders() {
    const currentHour = new Date().getHours();
    const users = await UserModel.findAll({
      where: {
        notification_time: currentHour,
      },
    });
    for (const user of users) {
      const token = user.dataValues.device_token;
      if (token) {
        const notificationPayload = {
          token,
          title: 'Hydration Reminder',
          body: "It's time to drink water! Stay hydrated 💧",
        };
        this.sendPushNotification(notificationPayload);
      }
    }
  }
}
