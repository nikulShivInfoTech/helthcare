import {
  Table,
  Model,
  Column,
  IsEmail,
  Default,
  AllowNull,
  Sequelize,
  DataType,
} from 'sequelize-typescript';
import { CommonDiseases, Lifestyle } from 'src/libs/utility/constants/enums';

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel> {
  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @IsEmail
  @Column
  email: string;

  @AllowNull(false)
  @Column
  password: string;

  @AllowNull(false)
  @Column
  phone_number: string;

  @AllowNull(false)
  @Column
  gender: string;

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  height: number;

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  weight: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  age: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  calories_intake: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  notification_time: number;

  @AllowNull(true)
  @Column({ type: DataType.ENUM(...Object.values(Lifestyle)) })
  lifestyle: Lifestyle;

  @AllowNull(true)
  @Column({ type: DataType.ENUM(...Object.values(CommonDiseases)) })
  existing_diseases: CommonDiseases;

  @AllowNull(false)
  @Default(false)
  @Column
  is_deleted: boolean;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({ type: 'TIMESTAMP' })
  declare createdAt: Date;

  @Default(Sequelize.literal('CURRENT_TIMESTAMP'))
  @Column({
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
      'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    ),
  })
  declare updatedAt: Date;
}
