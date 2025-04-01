import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthModel } from 'src/model/health.model';
import { CreateHealthDto } from './dto/health.dto';
import { Op } from 'sequelize';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(HealthModel) private readonly healthModel: typeof HealthModel,
  ) {}

  async addHealthData(req: any, createHealthDto: CreateHealthDto) {
    const { calories_intake, water_intake } = createHealthDto;
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0];

    const existingData = await this.healthModel.findOne({
      where: {
        userId,
        date: today,
      },
    });

    if (existingData) {
      existingData.calories_intake += calories_intake;
      existingData.water_intake += water_intake;

      return existingData.save();
    } else {
      const payload: any = {
        userId,
        calories_intake,
        water_intake,
        date: today,
      };
      const newData = await this.healthModel.create(payload);

      return newData;
    }
  }

  async getDailySummary(userId: number, date: string) {
    const data = await this.healthModel.findOne({
      where: {
        userId,
        date: date,
      },
    });

    if (!data) {
      throw new Error('No health data found for this date');
    }

    return {
      totalCaloriesIntake: data.calories_intake,
      totalWaterIntake: data.water_intake,
    };
  }
}
