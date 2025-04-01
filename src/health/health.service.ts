import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthModel } from 'src/model/health.model';
import { CreateHealthDto } from './dto/health.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { ResponseData } from 'src/libs/utility/constants/response';
import { GeneralResponse } from 'src/libs/services/generalResponse';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UpdateHealthDto } from './dto/helthDataUpdate.dto';
import { Op, where } from 'sequelize';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(HealthModel)
    private readonly healthModel: typeof HealthModel,
  ) {}

  async addHealthData(req: any, dto: CreateHealthDto) {
    const { water_intake, calories_intake } = dto;
    const userId = req.user.id;
    const payload: any = {
      userId,
      water_intake,
      calories_intake,
    };
    const newData = await this.healthModel.create(payload);

    Logger.log(`Intakes ${Messages.ADD_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `Intakes ${Messages.ADD_SUCCESS}`,
      newData,
    );
  }

  async getDailySummary(req: any) {
    const userId = req.user.id;

    const summaryOfDailyIntakes = await this.healthModel.findAll({
      where: {
        userId,
        status: false,
      },
    });

    Logger.log(`Daily intakes ${Messages.RETRIEVED_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      summaryOfDailyIntakes,
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updateDailyStatus() {
    Logger.log('Updating daily health log status...');

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const endOfYesterday = new Date();
    endOfYesterday.setDate(endOfYesterday.getDate() - 1);
    endOfYesterday.setHours(23, 59, 59, 999);

    await this.healthModel.update(
      { status: true },
      {
        where: {
          createdAt: {
            [Op.between]: [yesterday, endOfYesterday],
          },
          status: false,
        },
      },
    );
    Logger.log('Daily health logs updated successfully.');
  }

  async updateDailyIntake(id, req: any, dto: UpdateHealthDto) {
    const { water_intake, calories_intake } = dto;
    const userId = req.user.id;
    const existingIntake = await this.healthModel.findOne({
      where: { id, userId, status: false },
    });

    if (!existingIntake) {
      Logger.error(`Intakes ${Messages.NOT_FOUND}`);
      return GeneralResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Intakes ${Messages.NOT_FOUND}`,
      );
    }

    await existingIntake.update(
      { water_intake, calories_intake },
      { where: { status: false } },
    );

    Logger.log(`Intake ${Messages.UPDATE_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Intake ${Messages.UPDATE_SUCCESS}`,
    );
  }
}
