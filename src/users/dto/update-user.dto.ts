import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import {
  CommonDiseases,
  Lifestyle,
  TimeRangesForNotification,
} from 'src/libs/utility/constants/enums';

export class UpdateUserDto {
  @ApiProperty({
    example: 'John Doe Updated',
    description: 'Full name of the user',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: '9876543210', description: 'User phone number' })
  @IsOptional()
  @IsString()
  phone_number?: string;

  @ApiProperty({ example: 'male', description: 'Gender of the user' })
  @IsOptional()
  @IsString()
  gender?: string;

  @ApiProperty({ example: 182, description: 'User height in cm' })
  @IsOptional()
  @IsNumber()
  height?: number;

  @ApiProperty({ example: 78, description: 'User weight in kg' })
  @IsOptional()
  @IsNumber()
  weight?: number;

  @ApiProperty({ example: 26, description: 'User age' })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiProperty({
    example: Lifestyle.MODERATE,
    description: 'User lifestyle',
    enum: Lifestyle,
  })
  @IsOptional()
  @IsEnum(Lifestyle)
  lifestyle?: Lifestyle;

  @ApiProperty({
    example: CommonDiseases.HYPERTENSION,
    description: 'Existing disease the user has',
    enum: CommonDiseases,
  })
  @IsOptional()
  @IsEnum(CommonDiseases)
  existing_diseases?: CommonDiseases;

  @ApiProperty({
    example: TimeRangesForNotification.H12,
    description: 'notification time',
    enum: TimeRangesForNotification,
  })
  @IsEnum(TimeRangesForNotification)
  @IsOptional()
  notification_time: TimeRangesForNotification;

  @ApiProperty({
    example: 3,
    description: 'Daily water intake requirement in liters',
  })
  @IsOptional()
  @IsNumber()
  water_intake: number;

  @ApiProperty({ example: 2800, description: 'Calories intake in day' })
  @IsOptional()
  @IsNumber()
  calories_intake: number;
}
