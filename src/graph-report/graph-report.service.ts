import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize } from 'sequelize';
import { pagination, sorting } from 'src/libs/helpers/commonFunction';
import { GeneralResponse } from 'src/libs/services/generalResponse';
import { Messages } from 'src/libs/utility/constants/message';
import { ResponseData } from 'src/libs/utility/constants/response';
import { HealthModel } from 'src/model/health.model';
import { UserModel } from 'src/model/user.model';
import { ReportDto } from './dto/report.dto';

@Injectable()
export class GraphReportService {
  constructor(
    @InjectModel(HealthModel)
    private readonly healthModel: typeof HealthModel,
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel,
  ) {}

  async graphData(req: any) {
    const user_id: any = req.user.id;

    const user: any = await this.userModel.findOne({ where: { id: user_id } });
    const healthLogs = await this.healthModel.findAll({
      where: {
        user_id: user_id,
        status: false,
      },
      attributes: ['createdAt', 'water_intake'],
      order: [['createdAt', 'ASC']],
    });
    const totalWaterIntakeML = healthLogs.reduce(
      (sum, log) => sum + log.dataValues.water_intake,
      0,
    );

    const totalWaterIntakeLiters = totalWaterIntakeML / 1000;
    const waterGoal = user.dataValues.water_intake;
    const progress = ((totalWaterIntakeLiters / waterGoal) * 100).toFixed(2);

    const response = {
      user_id,
      totalWaterIntakeLiters,
      waterGoalLiters: waterGoal,
      progress: `${progress}%`,
      logs: healthLogs.map((log) => ({
        time: log.createdAt.toISOString(),
        intakeML: log.dataValues.water_intake,
      })),
    };

    Logger.log(`Graph ${Messages.RETRIEVED_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      undefined,
      response,
    );
  }

  async getHealthReport(dto: ReportDto) {
    const { user_id, startDate, endDate, page, pageSize, sortKey, sortValue } =
      dto;

    const user: any = await UserModel.findByPk(user_id);
    const dailyWaterGoal = user.dataValues?.water_intake || 0;
    const sortQuery = sorting(sortKey || 'createdAt', sortValue || 'desc');

    const whereCondition: any = {
      where: {
        user_id,
        createdAt: {
          [Op.between]: [`${startDate} 00:00:00`, `${endDate} 23:59:59`],
        },
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('createdAt')), 'date'],
        [Sequelize.fn('SUM', Sequelize.col('water_intake')), 'total_water_ml'],
        [
          Sequelize.fn('SUM', Sequelize.col('calories_intake')),
          'total_calories',
        ],
      ],
      group: [Sequelize.fn('DATE', Sequelize.col('createdAt'))],
      order: sortQuery,
    };

    const paginationResult = await pagination(
      HealthModel,
      page,
      pageSize,
      whereCondition,
      'report',
    );

    paginationResult.report = paginationResult.report.map((item: any) => {
      const data = item.dataValues;
      const totalWaterLiters = (data.total_water_ml || 0) / 1000;
      const progress =
        dailyWaterGoal > 0
          ? ((totalWaterLiters / dailyWaterGoal) * 100).toFixed(2)
          : '0.00';

      return {
        date: data.date,
        totalWaterIntake: `${totalWaterLiters.toFixed(2)}L`,
        waterGoalProgress: `${progress}%`,
        totalCaloriesIntake: `${data.total_calories || 0} kcal`,
      };
    });

    return {
      user: {
        name: user.dataValues?.name,
        age: user.dataValues?.age,
      },
      startDate,
      endDate,
      ...paginationResult,
    };
  }
}
