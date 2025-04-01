import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetHealthSummaryDto {
  @ApiProperty({
    description: 'User ID to fetch the health data',
    example: 1,
  })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description:
      'Date for which the health summary is requested (format: YYYY-MM-DD)',
    example: '2025-04-01',
  })
  @IsNotEmpty()
  @IsString()
  date: string;
}
