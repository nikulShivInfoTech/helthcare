import { JwtService } from '@nestjs/jwt';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from '../model/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { GeneralResponse } from 'src/libs/services/generalResponse';
import { ResponseData } from 'src/libs/utility/constants/response';
import { Messages } from 'src/libs/utility/constants/message';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: typeof UserModel,
    private readonly jwtService: JwtService,
  ) {}

  async userRegistration(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    const existingUser = await this.userModel.findOne({
      where: { email },
    });

    if (existingUser) {
      Logger.error(`${Messages.ALREADY_REGISTERED}`);
      return GeneralResponse(
        HttpStatus.CONFLICT,
        ResponseData.ERROR,
        `${Messages.ALREADY_REGISTERED}`,
      );
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const payloadForCreateUser: any = {
      name: createUserDto.name,
      email: createUserDto.email,
      password: hashedPassword,
      phone_number: createUserDto.phone_number,
      gender: createUserDto.gender,
      calories_intake: createUserDto.calories_intake,
      height: createUserDto.height,
      weight: createUserDto.weight,
      age: createUserDto.age,
      lifestyle: createUserDto.lifestyle,
      existing_diseases: createUserDto.existing_diseases,
      notification_time: createUserDto.notification_time,
    };

    const user = await this.userModel.create(payloadForCreateUser);

    Logger.log(`${Messages.REGISTRATION_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.CREATED,
      ResponseData.SUCCESS,
      `${Messages.REGISTRATION_SUCCESS}`,
      { id: user.dataValues.id },
    );
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userExists = await this.userModel.findOne({ where: { email } });

    if (!userExists) {
      Logger.error(`Email ${Messages.NOT_EXIST}`);
      return GeneralResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.ERROR,
        `Email ${Messages.NOT_EXIST}`,
      );
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      userExists.dataValues.password,
    );

    if (!isPasswordMatch) {
      Logger.error(`${Messages.PASS_NOT_MATCH}`);
      return GeneralResponse(
        HttpStatus.BAD_REQUEST,
        ResponseData.ERROR,
        `${Messages.PASS_NOT_MATCH}`,
      );
    }

    const token = await this.jwtService.signAsync({
      id: userExists.dataValues.id,
      email: userExists.dataValues.email,
    });

    Logger.log(`${Messages.LOGIN_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.OK,
      ResponseData.SUCCESS,
      Messages.LOGIN_SUCCESS,
      { token },
    );
  }

  async updateUser(updateUserDto: UpdateUserDto, req: any) {
    let id = req.user.id;
    const userData = await this.userModel.findOne({
      where: { id, is_deleted: false },
    });

    if (!userData) {
      Logger.error(`User ${Messages.NOT_FOUND}`);
      return GeneralResponse(
        HttpStatus.NOT_FOUND,
        ResponseData.ERROR,
        `User ${Messages.NOT_FOUND}`,
      );
    }

    await this.userModel.update({ ...updateUserDto }, { where: { id } });

    Logger.log(`Profile ${Messages.UPDATE_SUCCESS}`);
    return GeneralResponse(
      HttpStatus.ACCEPTED,
      ResponseData.SUCCESS,
      `Profile ${Messages.UPDATE_SUCCESS}`,
    );
  }
}
