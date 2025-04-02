import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateHealthDto {
  @ApiProperty({
    example: 2,
    description: 'Water intake in liters',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  water_intake?: number;

  @ApiProperty({
    example: 500,
    description: 'Calorie intake in kcal',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  calories_intake?: number;
}
