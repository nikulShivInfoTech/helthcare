import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/health.dto';
import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/libs/services/auth/jwt.guard';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('add-intakes')
  async addHealthData(
    @Body() createHealthDto: CreateHealthDto,
    @Req() req: any,
  ) {
    return await this.healthService.addHealthData(req, createHealthDto);
  }

  @Get('summary/:userId/:date')
  @ApiOperation({
    summary: 'Get daily health summary (calories and water intake)',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved daily health summary.',
    schema: {
      example: {
        totalWaterIntake: 2.5,
        totalCaloriesIntake: 2800,
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Data not found for the given date',
  })
  async getDailySummary(
    @Param('userId') userId: number,
    @Param('date') date: string,
  ) {
    return await this.healthService.getDailySummary(userId, date);
  }
}
