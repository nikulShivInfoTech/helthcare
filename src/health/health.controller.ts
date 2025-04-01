import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
  Put,
  Param,
} from '@nestjs/common';
import { HealthService } from './health.service';
import { CreateHealthDto } from './dto/health.dto';
import { GetHealthSummaryDto } from './dto/get-health-summary.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/libs/services/auth/jwt.guard';
import { UpdateHealthDto } from './dto/helthDataUpdate.dto';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('add-intakes')
  async addHealthData(@Body() dto: CreateHealthDto, @Req() req: any) {
    return await this.healthService.addHealthData(req, dto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('get-intakes-details')
  async getDailySummary(
    @Body() getHealthSummaryDto: GetHealthSummaryDto,
    @Req() req: any,
  ) {
    return await this.healthService.getDailySummary(req, getHealthSummaryDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Put('update-intakes-details/:id')
  async updateDailyIntake(
    @Param('id') id: number,
    @Body() updateHealthDto: UpdateHealthDto,
    @Req() req: any,
  ) {
    return await this.healthService.updateDailyIntake(id, req, updateHealthDto);
  }
}
