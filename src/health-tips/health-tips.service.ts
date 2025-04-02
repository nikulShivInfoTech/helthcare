import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GeneralResponse } from 'src/libs/services/generalResponse';
import { Messages } from 'src/libs/utility/constants/message';
import { ResponseData } from 'src/libs/utility/constants/response';
import { CureSuggestionsModel } from 'src/model/cureTips.model';
import { DiseasesModel } from 'src/model/disease.model';
import { UserModel } from 'src/model/user.model';

@Injectable()
export class HealthTipsService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    @InjectModel(DiseasesModel)
    private readonly diseasesModel: typeof DiseasesModel,
    @InjectModel(CureSuggestionsModel)
    private readonly cureSuggestionsModel: typeof CureSuggestionsModel,
  ) {}
  async cureSuggestionsTips(req: any) {
    const id = req.user.id;
    const findUserDetails: any = await this.userModel.findOne({
      where: { id },
    });

    if (!findUserDetails) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return GeneralResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    const findCure = await this.diseasesModel.findOne({
      where: { name: findUserDetails.dataValues.existing_diseases },
      attributes: ['name'],
      include: [
        {
          model: this.cureSuggestionsModel,
          attributes: ['suggestion'],
        },
      ],
    });

    Logger.log(`Cure suggestion ${Messages.RETRIEVED_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      undefined,
      findCure,
    );
  }
}
