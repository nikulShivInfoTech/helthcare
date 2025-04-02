import {
  Table,
  Model,
  Column,
  ForeignKey,
  AllowNull,
  Default,
  Sequelize,
  DataType,
  BelongsTo,
} from 'sequelize-typescript';
import { UserModel } from './user.model';

@Table({ tableName: 'health' })
export class HealthModel extends Model<HealthModel> {
  @AllowNull(false)
  @ForeignKey(() => UserModel)
  @Column
  user_id: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  calories_intake: number;

  @AllowNull(false)
  @Column({ type: DataType.FLOAT })
  water_intake: number;

  @AllowNull(false)
  @Default(false)
  @Column
  status: boolean;

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

  @BelongsTo(() => UserModel, 'user_id')
  user: UserModel;
}
