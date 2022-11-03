import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from '../entities/users.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  // apiKeyを元にユーザ情報を取得する
  async getUserInfo(apiKey: string) {
    return await this.usersRepository.findOne({ where: { api_key: apiKey } });
  }
}
