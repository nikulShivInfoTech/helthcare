import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HealthModel } from 'src/model/health.model';
import { CreateHealthDto } from './dto/health.dto';
import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import { Messages } from 'src/libs/utility/constants/message';
import { ResponseData } from 'src/libs/utility/constants/response';
import { GeneralResponse } from 'src/libs/services/generalResponse';

@Injectable()
export class HealthService {
  constructor(
    @InjectModel(HealthModel)
    private readonly healthModel: typeof HealthModel,
  ) {}

  async addHealthData(req: any, dto: CreateHealthDto) {
    const { water_intake, calories_intake, date } = dto;
    const userId = req.user.id;
    const payload: any = {
      userId,
      water_intake,
      calories_intake,
      date,
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

  async getDailySummary(req: any, getHealthSummaryDto: GetHealthSummaryDto) {
    const userId = req.user.id;
    const summaryOfDailyIntakes = await this.healthModel.findAll({
      where: {
        userId,
        date: getHealthSummaryDto.date,
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
}
