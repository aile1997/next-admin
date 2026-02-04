import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async create(roleData: Partial<Role>): Promise<Role> {
    const existingRole = await this.rolesRepository.findOne({ where: { name: roleData.name } });
    if (existingRole) {
      throw new ConflictException('角色名已存在');
    }
    const role = this.rolesRepository.create(roleData);
    return this.rolesRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
