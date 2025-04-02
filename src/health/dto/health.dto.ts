import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateHealthDto {
  @ApiProperty({
    description: 'Calories intake for the day',
    example: 2800,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  calories_intake: number;

  @ApiProperty({
    description: 'Water intake for the day in liters',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  water_intake: number;
}
