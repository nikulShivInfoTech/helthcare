import {
  Controller,
  Get,
  Req,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { HealthTipsService } from './health-tips.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtGuard } from 'src/libs/services/auth/jwt.guard';

@Controller('health-tips')
export class HealthTipsController {
  constructor(private readonly healthTipsService: HealthTipsService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Get('get-cure-suggestions')
  cureSuggestionsTips(@Req() req: any) {
    return this.healthTipsService.cureSuggestionsTips(req);
  }
}
