import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  IsNumber,
  IsOptional,
  IsEnum,
} from 'class-validator';
import {
  CommonDiseases,
  Lifestyle,
  TimeRangesForNotification,
} from 'src/libs/utility/constants/enums';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'john@example.com',
    description: 'User email address',
  })
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({
    example: 'Password@123',
    description:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;

  @ApiProperty({ example: '7654565464', description: 'User phone number' })
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty({ example: 'male', description: 'Gender of the user' })
  @IsNotEmpty()
  @IsString()
  gender: string;

  @ApiProperty({ example: 2800, description: 'Calories intake in day' })
  @IsNotEmpty()
  @IsNumber()
  calories_intake: number;

  @ApiProperty({ example: 180, description: 'User height in cm' })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ example: 75, description: 'User weight in kg' })
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 25, description: 'User age' })
  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ApiProperty({
    example: Lifestyle.ACTIVE,
    description: 'User lifestyle',
    enum: Lifestyle,
  })
  @IsOptional()
  @IsEnum(Lifestyle)
  lifestyle: Lifestyle;

  @ApiProperty({
    example: CommonDiseases.DIABETES,
    description: 'Existing disease the user has',
    enum: CommonDiseases,
  })
  @IsOptional()
  @IsEnum(CommonDiseases)
  existing_diseases: CommonDiseases;

  @ApiProperty({
    example: TimeRangesForNotification.H12,
    description: 'notification time',
    enum: TimeRangesForNotification,
  })
  @IsNotEmpty()
  @IsEnum(TimeRangesForNotification)
  notification_time: TimeRangesForNotification;

  @ApiProperty({
    example: 3,
    description: 'Daily water intake requirement in liters',
  })
  @IsNotEmpty()
  @IsNumber()
  water_intake: number;

  @ApiProperty({
    example: 'device fmc token',
    description: '',
  })
  @IsNotEmpty()
  @IsString()
  device_token: string;
}
