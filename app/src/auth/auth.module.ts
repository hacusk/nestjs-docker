import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Users } from '../entities/users.entity';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule],
  providers: [AuthService, AuthStrategy],
  exports: [AuthService],
})
export class AuthModule {}
