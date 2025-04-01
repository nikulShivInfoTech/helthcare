import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/libs/services/auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('registration')
  async userRegistration(@Body() createUserDto: CreateUserDto) {
    return this.usersService.userRegistration(createUserDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async userLogin(@Body() loginDto: LoginDto) {
    return await this.usersService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @Post('update-user')
  async updateUser(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return await this.usersService.updateUser(updateUserDto, req);
  }
}
