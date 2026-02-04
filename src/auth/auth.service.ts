import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from '../entities/access-token.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectRepository(AccessToken)
    private accessTokenRepository: Repository<AccessToken>,
  ) {}

  /**
   * 验证用户身份
   * @param username 用户名
   * @param pass 原始密码
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('用户名或密码错误');
  }

  /**
   * 登录并生成 JWT 令牌
   * @param user 用户对象
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, roles: user.roles.map(r => r.name) };
    const token = this.jwtService.sign(payload);

    // 将令牌记录在数据库中
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 1); 

    const accessToken = this.accessTokenRepository.create({
      token,
      expiresAt,
      userId: user.id,
    });
    await this.accessTokenRepository.save(accessToken);

    return {
      access_token: token,
      user: {
        id: user.id,
        username: user.username,
        roles: user.roles,
      }
    };
  }

  /**
   * 注册新用户
   */
  async register(userData: any) {
    return this.usersService.create(userData);
  }
}
