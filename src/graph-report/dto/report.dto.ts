import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ReportDto {
  @ApiProperty({ example: 1, description: 'User ID', required: true })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: '2025-04-01',
    description: 'Start Date (YYYY-MM-DD)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  startDate: string;

  @ApiProperty({
    example: '2025-04-07',
    description: 'End Date (YYYY-MM-DD)',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  endDate: string;

  @ApiProperty({ example: 1, description: 'Page number', required: false })
  @IsOptional()
  @IsNumber()
  page?: number;

  @ApiProperty({ example: 10, description: 'Page size', required: false })
  @IsOptional()
  @IsNumber()
  pageSize?: number;

  @ApiProperty({
    example: 'createdAt',
    description: 'Sort Key',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortKey?: string;

  @ApiProperty({
    example: 'desc',
    description: 'Sort Order (asc/desc)',
    required: false,
  })
  @IsOptional()
  @IsString()
  sortValue?: string;
}
