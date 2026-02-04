import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
      relations: ['roles'],
      select: ['id', 'username', 'password', 'isActive'],
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const { username, password, email } = userData;

    if (!username || !password) {
      throw new Error('用户名和密码不能为空');
    }

    const existingUser = await this.usersRepository.findOne({ where: { username } });
    if (existingUser) {
      throw new ConflictException('用户名已存在');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    let defaultRole = await this.rolesRepository.findOne({ where: { name: 'user' } });
    if (!defaultRole) {
      defaultRole = this.rolesRepository.create({ name: 'user', description: '普通用户' });
      await this.rolesRepository.save(defaultRole);
    }

    const user = this.usersRepository.create({
      username,
      password: hashedPassword,
      email,
      roles: [defaultRole],
    });

    const savedUser = await this.usersRepository.save(user);
    const result = { ...savedUser };
    delete (result as any).password;
    return result as User;
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { id },
      relations: ['roles'],
    });
  }
}
