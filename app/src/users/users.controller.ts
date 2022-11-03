import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  UseGuards,
  Param,
  Put,
} from '@nestjs/common';
import { Users } from 'src/entities/users.entity';

import { AuthGuard } from '../auth/auth.guard';

import { RegisterUserDto } from './register-user.dto';
import { UpdateUserDto } from './update-user.dto';
import { UsersService } from './users.service';

/**
 *
 * ユーザ情報関連API
 *
 */
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // ユーザ情報全件取得API
  @Get()
  async findAll(): Promise<Users[]> {
    return await this.usersService.usersFindAll();
  }

  // ユーザ情報登録API
  @Post()
  async registerUser(@Body() registerUser: RegisterUserDto): Promise<Users> {
    return await this.usersService.registerUser(registerUser);
  }

  // ユーザ情報更新API
  @Put(':id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUser: UpdateUserDto,
    @Headers('x-api-key') apiKey: string,
  ): Promise<Users> {
    return await this.usersService.updateUser(userId, apiKey, updateUser);
  }
}
