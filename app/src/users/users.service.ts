import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';

import { AuthService } from '../auth/auth.service';
import { Users } from '../entities/users.entity';
import { RegisterUserDto } from './register-user.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {}

  /**
   *
   * ユーザ情報全件取得する。
   *
   * @returns Users[]
   */
  usersFindAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  /**
   *
   * ユーザ情報を登録する。
   *
   * @param RegisterUserDto
   * @returns Users
   */
  async registerUser(registerUser: RegisterUserDto): Promise<Users> {
    const N = Number(this.config.get('N'));

    const user = new Users();
    user.name = registerUser.name;
    user.api_key = randomBytes(N).toString('base64').substring(0, N);

    return await this.usersRepository.save(user);
  }

  /**
   *
   * ユーザ情報を更新する。
   *
   * @param userId
   * @param apiKey
   * @param updateUser
   * @returns Users
   */
  async updateUser(
    userId: number,
    apiKey: string,
    updateUser: UpdateUserDto,
  ): Promise<Users> {
    // apikeyに紐づいているIDと更新するユーザ情報のIDが一致しない場合はForbiddenを返却
    const userInfo = await this.authService.getUserInfo(apiKey);
    if (userInfo.id != userId) {
      throw new ForbiddenException();
    }

    const user = await this.usersRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUser.name;

    return await this.usersRepository.save(user);
  }
}
