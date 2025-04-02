import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { GraphReportService } from './graph-report.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/libs/services/auth/jwt.guard';
import { ReportDto } from './dto/report.dto';

@Controller('graph-report')
export class GraphReportController {
  constructor(private readonly graphReportService: GraphReportService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('graph-data')
  async graphData(@Req() req: any) {
    return this.graphReportService.graphData(req);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('report')
  async getHealthReport(@Body() dto: ReportDto) {
    return this.graphReportService.getHealthReport(dto);
  }
}
