import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { DiseasesModel } from './disease.model';

@Table({ tableName: 'cure_suggestions' })
export class CureSuggestionsModel extends Model<CureSuggestionsModel> {
  @AllowNull(false)
  @ForeignKey(() => DiseasesModel)
  @Column
  disease_id: number;

  @AllowNull(false)
  @Column
  suggestion: string;

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

  @BelongsTo(() => DiseasesModel)
  disease: DiseasesModel;
}
