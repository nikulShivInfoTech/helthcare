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

  async addHealthData(req: any, dto: any) {
    const userId = req.user.id;
    const newData = await this.healthModel.create({ userId, ...dto });

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

    if (summaryOfDailyIntakes.length === 0) {
      Logger.log(`Daily intakes ${Messages.NOT_FOUND}`);
      return GeneralResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `Daily intakes ${Messages.NOT_FOUND}`,
      );
    }

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
    const findIntakes = await this.healthModel.findAll({
      where: { status: false },
    });
    if (findIntakes.length !== 0) {
      for (let item of findIntakes) {
        await this.healthModel.update(
          { status: true },
          {
            where: {
              status: false,
            },
          },
        );
        Logger.log(`${Messages.SCHEDULE_MESS}`);
      }
    }
  }

  async updateDailyIntake(id, req: any, dto: any) {
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

    await existingIntake.update({ ...dto }, { where: { status: false } });

    Logger.log(`Intake ${Messages.UPDATE_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      `Intake ${Messages.UPDATE_SUCCESS}`,
    );
  }
}
