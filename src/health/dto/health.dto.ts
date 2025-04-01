// import { ApiProperty } from '@nestjs/swagger';
// import { IsNumber, IsOptional, IsString } from 'class-validator';

// export class CreateHealthDto {
//   @ApiProperty({
//     example: 75,
//     type: 'number',
//     format: 'weight',
//     required: true,
//   })
//   @IsNumber()
//   weight: number;

//   @ApiProperty({
//     example: 2700,
//     type: 'number',
//     format: 'calories_intake',
//     required: true,
//   })
//   @IsNumber()
//   calories_intake: number;

//   @ApiProperty({
//     example: 5,
//     type: 'number',
//     format: 'water_intake',
//     required: true,
//   })
//   @IsNumber()
//   water_intake: number;
// }

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

  @ApiProperty({
    description:
      'Date for which the health summary is created (format: YYYY-MM-DD)',
    example: '2025-04-01',
  })
  @IsNotEmpty()
  @IsString()
  date: string;
}
