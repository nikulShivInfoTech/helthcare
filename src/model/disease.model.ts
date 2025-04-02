import {
  AllowNull,
  Column,
  Default,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { CureSuggestionsModel } from './cureTips.model';

@Table({ tableName: 'diseases' })
export class DiseasesModel extends Model<DiseasesModel> {
  @AllowNull(false)
  @Column
  name: string;

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

  @HasMany(() => CureSuggestionsModel)
  cureSuggestions: CureSuggestionsModel[];
}
